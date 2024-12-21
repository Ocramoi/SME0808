#!/usr/bin/env python3

import os
from typing import Union, Callable, Dict
from flask import Flask, Response, request
import pandas as pd
import ast
import traceback
import logging
from multiprocessing.pool import ThreadPool
from alive_progress import alive_bar # type: ignore
from functools import reduce
from dotenv import load_dotenv
import numpy as np
import pathlib

from API import jsonResponse
from analysis import Analysis

load_dotenv()

app = Flask('SME0808')
logging.basicConfig()
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG if (os.getenv("ENV") == "dev") else logging.ERROR)

# consts
DATAFRAME_FOLDER = os.path.join(os.getcwd(), "data/dataframes")

def substitui_nan_por_distribuicao_normal(df: pd.DataFrame, atributo: str) -> pd.DataFrame:
    # Calcula a média dos valores não nulos:
    media = df[atributo].mean()
    # Calcula a variância dos valores não nulos:
    variancia = df[atributo].var()
    # Calcula o desvio padrão doos valores não nulos:
    desvio_padrao = np.sqrt(variancia)
    # Gera números aleatórios pertencentes a respectiva distribuição normal:
    valores_gerados = np.random.normal(loc=media, scale=desvio_padrao, size=len(df[atributo].isna()))
    # Substitui os NaN pelos número gerados:
    df.loc[df[atributo].isna(), atributo] = valores_gerados
    # Retorna o dataframe tratado:
    return df


def preProcess(fileName: str) -> pd.DataFrame:
    df: pd.DataFrame = pd.read_pickle(f"{DATAFRAME_FOLDER}/{fileName}")
    return preProcessDf(df)

def preProcessDf(df: pd.DataFrame) -> pd.DataFrame:
    df = substitui_nan_por_distribuicao_normal(df, "TEMPERATURA DO AR - BULBO SECO, HORARIA (°C)")
    df = substitui_nan_por_distribuicao_normal(df, "PRECIPITAÇÃO TOTAL, HORÁRIO (mm)")
    df = substitui_nan_por_distribuicao_normal(df, "RADIACAO_GLOBAL(Kj/m²)_mod")

    df.replace(-9999.0, float('nan'), inplace=True)
    df.drop(columns=[
        "DATA (YYYY-MM-DD)", "HORA (UTC)",
        "RADIACAO GLOBAL (KJ/m²)",
        'RADIACAO GLOBAL (Kj/m²)',
        'Hora UTC',
        'Data'
    ], inplace=True)
    df.dropna(inplace=True)
    df.reset_index(inplace=True)
    df.drop(columns=['index'], inplace=True)
    df["Year"] = df['Date_mod'].dt.strftime("%Y")
    df["Month"] = df['Date_mod'].dt.strftime("%m")
    df["Day"] = df['Date_mod'].dt.strftime("%d")
    return df

# load data
_data = {
    "df": ("dataframe_A001_mod.pkl", "Distrito Federal"),
    "am": ("dataframe_A101_mod.pkl", "Amazonas"),
    "ba": ("dataframe_A401_mod.pkl", "Bahia"),
    "rj": ("dataframe_A601_mod.pkl", "Rio de Janeiro"),
    'rs': ("dataframe_A801_mod.pkl", "Rio Grande do Sul"),
}

data: Dict[str, Analysis] = {}

def dataRunner(key: str, fileName: str, name: str):
    data[key] = Analysis(preProcess(fileName), name)

logger.info("Lendo base de dados...")
with ThreadPool() as pool:
    pool.map(lambda key: dataRunner(key, *_data[key]), list(_data.keys()))
logger.info("Base de dados lida!")

@app.route('/upload', methods=['POST'])
def upload():
    try:
        newFile = request.files['database']
        sigla = request.form['sigla']
        estado = request.form['estado']
        logger.info(f"Nova base de dados: {sigla} - {estado}")
        ext = pathlib.Path(newFile).suffix
        df = preProcessDf(pd.read_csv(newFile) if ext == '.csv' else pd.read_pickle(newFile))
        data[sigla] = Analysis(df, estado)
        return Response(status=200)
    except Exception as e:
        logger.error(e)
        return jsonResponse({
            'msg': "Erro no upload",
            'error': e.__str__()
        }, status=406)

@app.route('/estados')
def estados():
    return jsonResponse(list({ 'label': data[key].getEstado(), 'value': key } for key in data))

@app.route('/analise/<estado>/<func>')
@app.route('/analise/<estado>/<func>/<params>')
def state(estado: str, func: str, params: Union[str, None] = None):
    params = ast.literal_eval(params) if params else None
    try:
        callback = getattr(data[estado], func)
        return callback(*params) if params else callback()
    except Exception as e:
        app.logger.error(e)
        app.logger.error(traceback.format_exc())
        return Response(e.__str__(), status=500)

def seriesRunner(key: str, callback: Callable[[], None]):
    with ThreadPool() as pool:
        pool.map(lambda attr: data[key].timeSeries(attr, False), data[key].df.columns)
    callback()

logger.info("Inicializando...")
if os.getenv("ENV") == "prod":
    logger.info("Pré calculando base de séries...")
    with ThreadPool() as pool, \
        alive_bar(reduce(lambda iCurr, key: iCurr + len(data[key].df.columns), data.keys(), 0)) as bar:
        pool.map(lambda key: seriesRunner(key, bar), list(data.keys()))
    logger.info("Todas as séries calculadas")

if __name__ == "__main__":
    app.run()
