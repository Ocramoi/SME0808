import { FC, useEffect, useState, ChangeEvent } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Button, Drawer, dividerClasses } from '@mui/material';
import styles from './analysis.module.css';
import axios from 'axios';

const infoValues = [
    "max",
    "min",
    "avg",
    "med",
    "mod",
]

interface columnInfo {
    [key: string]: number
};

interface ufInfo {
    [uf: string]: {
        [column: string]: columnInfo
    }
};

export const Analysis: FC = () => {
    const [estado, setEstado] = useState('');
    const [estados, setEstados] = useState([{ label: '', value: '' }]);
    const [coluna, setColuna] = useState('');
    const [colunas, setColunas] = useState<string[]>([]);
    const [janela, setJanela] = useState('1');
    const [imgLoading, setImgLoading] = useState(false);
    const [info, setInfo] = useState(false);
    const [stationData, setStationData] = useState<ufInfo>({});

    const apiBaseUrl = "http://localhost:5000";

    useEffect(() => {
        Promise.all([
            axios
                .get(`${apiBaseUrl}/estados`)
                .then(response => setEstados(response.data?.data)),
        ])
               .then(() => console.log("Informações carregadas"))
               .catch(err => {
                   console.error(err);
                   alert("Erro ao obter informações!");
               });
    }, []);

    useEffect(() => {
        setEstado(estados[0].value);
    }, [ estados ])

    useEffect(() => {
        if (!estado.length)
            return;
        loadColumns();
    }, [ estado ])

    function setupInfo() {
        if (stationData?.[estado]?.[coluna]?.[infoValues[0]]) {
            setInfo(true);
            return;
        }

        let loadedValues: { [key: string]: number } = {};
        Promise.all(infoValues.map(info => (
            axios
                .get(`${apiBaseUrl}/analise/${estado}/${info}/['${coluna}']`)
                .then(response => (loadedValues[info] = response.data?.data))
            ))
        ).then(() => {
            setStationData({
                ...stationData,
                [estado]: {
                    ...(stationData[estado]),
                    [coluna]: loadedValues
                }
            })
        });
    }

    useEffect(() => setInfo(true), [ stationData ])

    useEffect(() => {
        if (!colunas.length)
            setColuna('');
        else
            setColuna(colunas[0]);
    }, [ colunas ])

    useEffect(() => {
        if (!coluna.length)
            return
        setupInfo();
    }, [ coluna ])

    async function loadColumns() {
        setColuna('');
        setInfo(false);
        axios
            .get(`${apiBaseUrl}/analise/${estado}/columns`)
            .then(response => setColunas(response.data?.data))
            .catch(err => {
                alert("Erro ao carregar colunas!");
                console.error(err);
                setColunas([]);
            });
    }

    function changeEstado(event: SelectChangeEvent) {
        setInfo(false);
        setEstado(event.target.value);
    };

    function changeColuna(event: SelectChangeEvent) {
        setInfo(false);
        setColuna(event.target.value);
    };

    useEffect(
        () => {
            setImgLoading(true);
            setInfo(false);
        }, [
            estado,
            coluna,
        ]
    );

    return (
        <Box className={ styles.analises }>
            { !info && (
                  <div className={ styles.loaderContainer }>
                      <div className={ styles.loader }></div>
                  </div>
            ) }

            <Box className={ styles.controle }>
                <h3>Controle de dados:</h3>
                <Box className={ styles.controls }>
                    <FormControl fullWidth className={ styles.controlGroup }>
                        <InputLabel>Estado</InputLabel>
                        <Select
                            value={`${estado}`}
                            label="Estado para análise"
                            onChange={changeEstado}
                        >
                            {
                                estados.map(v => (
                                    <MenuItem key={v.value} value={v.value}>{v.label}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    <FormControl fullWidth className={ styles.controlGroup }>
                        <InputLabel>Coluna</InputLabel>
                        <Select
                            value={`${coluna}`}
                            label="Coluna a ser analisada"
                            onChange={changeColuna}
                        >
                            {
                                colunas.map(v => (
                                    <MenuItem key={v} value={v}>{v}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    <FormControl fullWidth className={ styles.controlGroup }>
                        <InputLabel>Janela de análise</InputLabel>
                        <Select
                            value={`${janela}`}
                            label="Período analisado"
                            onChange={(e) => setJanela(e.target.value)}
                        >
                            <MenuItem value="1">Mês</MenuItem>
                            <MenuItem value="2">Dia</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <Box className={ styles.graph }>
                <h3>Análise de tendência:</h3>
                {
                    info && (
                        <center className={ styles.infoDisplay }>
                            {
                                imgLoading && (
                                    <div className={ styles.innerLoader }></div>
                                )
                            }
                            <img
                                src={(info && estado && coluna) ? `${apiBaseUrl}/analise/${estado}/serieTemporal/['${coluna}',${janela}]` : undefined}
                                style={{
                                    display: imgLoading ? 'none' : 'block',
                                }}
                                onLoad={() => setImgLoading(false)}
                                onLoadStart={() => setImgLoading(true)}
                                className={ styles.analysisGraph }
                                alt={ !imgLoading ? "Erro ao gerar o gráfico!" : undefined }
                            />
                        </center>
                    )
                }
            </Box>

            <Box className={ styles.data }>
                <h3>Dados de { coluna } medida na estação do(a) { estados.find(v => v.value == estado)?.label }:</h3>
                <br />
                <div className={ styles.pseudoTable }>
                    <span>Coluna</span>
                    <span><i>{coluna}</i></span>

                    <span>Máximo</span>
                    <span>{info ? stationData[estado][coluna]?.max : '-'}</span>

                    <span>Mínimo</span>
                    <span>{info ? stationData[estado][coluna]?.min : '-'}</span>

                    <span>Média</span>
                    <span>{info ? stationData[estado][coluna]?.avg : '-'}</span>

                    <span>Mediana</span>
                    <span>{info ? stationData[estado][coluna]?.med : '-'}</span>

                    <span>Moda</span>
                    <span>{info ? stationData[estado][coluna]?.mod : '-'}</span>
                </div>
            </Box>
        </Box>
    );
}
