#!/usr/bin/env python3

import pandas as pd
from flask import Response
from typing import Tuple, List, Dict, Union, Callable
import matplotlib.pyplot as plt
import seaborn as sns
from matplotlib.backends.backend_agg import FigureCanvasAgg
import io
import math
from API import jsonResponse
import numpy as np
from numpy.polynomial import Polynomial
from scipy.optimize import curve_fit
from scipy import stats
from alive_progress import alive_bar # type: ignore
from multiprocessing.pool import ThreadPool
import logging


class Analysis:
    """
    Implementação geral para análise de dataframes
    """

    def __init__(self, _df: pd.DataFrame, _estado: str):
        super(Analysis, self).__init__()
        logging.basicConfig()
        self.logger: logging.Logger = logging.getLogger(_estado)
        self.logger.setLevel(logging.DEBUG)
        self.estado: str = _estado
        self.dataDay: Dict[str, Tuple[List[int], List[float]]] = {}
        self.dataMonth: Dict[str, Tuple[List[int], List[float]]] = {}
        self.df = _df

    def getEstado(self) -> str:
        return self.estado

    def size(self) -> int:
        return jsonResponse(len(self.df))

    def shape(self):
        return jsonResponse(self.df.shape)

    def columns(self):
        return jsonResponse(list(self.df.columns))

    def max(self, column: str):
        return jsonResponse(max(self.df[column]))

    def min(self, column: str):
        return jsonResponse(min(self.df[column]))

    def avg(self, column: str):
        return jsonResponse(np.mean(self.df[column]))

    def med(self, column: str):
        return jsonResponse(np.median(self.df[column]))

    def mod(self, column: str):
        return jsonResponse(float(stats.mode(self.df[column])[0])) # type: ignore

    def getColumn(self, column: str):
        return jsonResponse(list(self.df[column]))

    def __innerTimeSeries(
            self,
            attr: str,
            anos: List[int], meses: List[int], dias: List[int],
            callback: Callable[[], None]
    ):
        for ano in anos:
            temp_ano = self.df[attr].loc[(self.df['Year'] == ano)]
            if temp_ano.empty:
                for _ in range(len(meses)*len(dias)):
                    callback()
                    continue
            for mes in meses:
                temp_mes = temp_ano.loc[(self.df['Month'] == mes)]
                if temp_mes.empty:
                    for _ in range(len(dias)):
                        callback()
                    continue
                self.dataMonth[attr][0].append(len(self.dataMonth[attr][0]) + 1)
                media = temp_mes.mean()
                self.dataMonth[attr][1].append(media)
                for dia in dias:
                    callback()
                    temp_dia = temp_mes.loc[(self.df['Day'] == dia)]
                    if temp_dia.empty:
                        continue
                    self.dataDay[attr][0].append(len(self.dataDay[attr][0]) + 1)
                    media = temp_dia.mean()
                    self.dataDay[attr][1].append(media)


    def timeSeries(self, attr: str, showProgress: bool = True):
        if self.dataMonth.get(attr) is not None and \
           self.dataDay.get(attr) is not None:
            return self.dataDay[attr], self.dataMonth[attr]

        self.dataMonth[attr] = ([], [])
        self.dataDay[attr] = ([], [])

        anos, meses, dias = [], [], []
        with ThreadPool() as pool:
            anos, meses, dias = pool.map(lambda column: sorted(self.df[column].unique()), [ 'Year', 'Month', 'Day' ])

        if showProgress:
            with alive_bar(len(anos)*len(meses)*len(dias)) as bar:
                bar.title = f"Calculando valores de {attr} para {self.estado}"
                self.__innerTimeSeries(attr, anos, meses, dias, bar)
        else:
            self.__innerTimeSeries(attr, anos, meses, dias, lambda: None)

    def __plotSeries(
            self,
            X: List[int],
            Y: Union[List[float], List[int]],
            xLabel: str = "",
            yLabel: str = "",
            title: str = ""
    ) -> Response:
        fig = plt.figure(figsize=(15, 6))
        sns.lineplot(x=X, y=Y)
        plt.xlabel(xLabel)
        plt.ylabel(yLabel)
        plt.title(title)
        output = io.BytesIO()
        FigureCanvasAgg(fig).print_png(output)
        return Response(output.getvalue(), status=200, mimetype='image/png')

    def __plotResults(
            self,
            t: List[int],
            Yt: np.ndarray[Tuple[int], np.dtype[np.float64]],
            Tt,
            St,
            xLabel: str,
            yLabel: str,
            title: str
    ) -> Response:
        fig = plt.figure(figsize=(15, 6), clear=True)
        fig.patch.set_alpha(0)
        plt.plot(t, Yt, label='Série Observada $Y_t$', color='blue', marker='o', markersize=3)
        plt.plot(t, Tt, label='Tendência $T_t$', color='orange', linewidth=2)
        plt.plot(t, St + Tt, label='Sazonalidade + Tendência', color='red', linewidth=2)
        plt.legend()
        plt.xlabel(xLabel)
        plt.ylabel(yLabel)
        plt.title(title)
        plt.grid()
        output = io.BytesIO()
        FigureCanvasAgg(fig).print_png(output)
        return Response(output.getvalue(), status=200, mimetype='image/png')

    def __checkBoxCox(self, data: List[Union[float, int]]) -> bool:
        for v in data:
            if v <= 0 or math.isclose(v, 0) or not v:
                return False
        return True

    def __harmonic(self, t: np.ndarray, *params) -> float:
        h = len(params) // 2
        P = 12
        res = 0

        for i in range(h):
            alfa, beta = params[i], params[i + h]
            lambdaI = 2*np.pi*(i + 1)/P
            res += alfa * np.cos(lambdaI * t) + (beta * np.sin(lambdaI * t))

        return res

    def __adjustSeasonality(
            self,
            x: List[int],
            y: np.ndarray[Tuple[int], np.dtype[np.float64]],
            h: int
    ) -> Tuple[float, np.ndarray]:
        t = np.array(x)
        adj, _cov = curve_fit(self.__harmonic, t, y, [1]*(2*h)) # type: ignore
        adjusted = self.__harmonic(t, *adj)
        return adjusted, adj

    def __adjustPoli(
            self,
            x: List[int],
            y: np.ndarray[Tuple[int], np.dtype[np.float64]],
            degree: int
    ) -> Tuple[np.ndarray, np.ndarray]:
        t = np.array(x)
        coef = Polynomial.fit(t, y, degree).convert().coef
        return np.polyval(coef[::-1], t), coef #type: ignore

    def serieTemporal(self, attr: str, op: int = 1):
        self.timeSeries(attr)
        t, _medias = self.dataMonth[attr] if op == 1 else self.dataDay[attr]
        medias: np.ndarray = np.array(_medias)
        if self.__checkBoxCox(_medias):
            trans, lambdaBoxCox = stats.boxcox(medias)
            St, params = self.__adjustSeasonality(t, trans, 5)
            Yt = trans - St
            Tt, coef = self.__adjustPoli(t, Yt, 2) # type: ignore
            return self.__plotResults(
                t, trans,
                Tt, St,
                "Mês" if op == 1 else "Dia", f"{attr} transformado (lambda ~ {round(lambdaBoxCox, 2)})",
                "Ajuste de Sazonalidade e Tendência"
            )
        St, params = self.__adjustSeasonality(t, medias, 5)
        Yt = medias - St
        Tt, coef = self.__adjustPoli(t, Yt, 2) # type: ignore
        return self.__plotResults(
            t, medias,
            Tt, St,
            "Mês" if op == 1 else "Dia", f"{attr}",
            "Ajuste de Sazonalidade e Tendência"
        )
