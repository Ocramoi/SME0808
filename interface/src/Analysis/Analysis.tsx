import { FC, useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Button, Accordion, AccordionSummary, Typography, AccordionDetails, Input, TextField, Alert } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckIcon from '@mui/icons-material/Check';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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
    const [newEstado, setNewEstado] = useState(''),
          [newSigla, setNewSigla] = useState(''),
          [janela, setJanela] = useState('1'),
          [coluna, setColuna] = useState(''),
          [estado, setEstado] = useState(''),
          [alertInfo, setAlertInfo] = useState<{ severity: "info" | "success" | "warning" | "error", text: string } | null>(null),
          [update, setUpdate] = useState(true),
          [file, setFile] = useState<File | null>(null),
          [stationData, setStationData] = useState<ufInfo>({}),
          [info, setInfo] = useState(false),
          [imgLoading, setImgLoading] = useState(false),
          [colunas, setColunas] = useState<string[]>([]),
          [estados, setEstados] = useState([{ label: '', value: '' }]);

    const apiBaseUrl = "http://localhost:5000";

    useEffect(() => {
        if (!update)
            return;

        Promise.all([
            axios
                .get(`${apiBaseUrl}/estados`)
                .then(response => setEstados(response.data?.data)),
        ])
               .then(() => console.log("Informações carregadas"))
               .catch(err => {
                   console.error(err);
                   alert("Erro ao obter informações!");
               }).finally(() => setUpdate(false));
    }, [ update ]);

    useEffect(() => {
        setEstado(estados[0].value);
    }, [ estados ])

    useEffect(() => {
        if (!estado.length)
            return;
        loadColumns();
    }, [ estado ])

    function setupInfo() {
        setInfo(false);
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

    useEffect(() => setInfo(stationData[estado] !== undefined), [ stationData ])

    useEffect(() => {
        if (!colunas.length)
            setColuna('');
        else
            setColuna(colunas[0]);
    }, [ colunas ])

    useEffect(() => {
        if (!coluna.length)
            return;
        setupInfo();
    }, [ coluna ])

    async function loadColumns() {
        setColunas([]);
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
        }, [
            estado,
            coluna,
        ]
    );

    function sendDatabase() {
        setAlertInfo({ severity: "info", text: "Carregando novos dados..." });
        axios
            .postForm(`${apiBaseUrl}/upload`, {
                sigla: newSigla,
                estado: newEstado,
                database: file,
            })
            .then(() => {
                setUpdate(true);
                setAlertInfo({ severity: "success", text: "Dados carregados com sucesso!" });
                setNewSigla(""); setNewEstado(""); setFile(null);
            })
            .catch(err => {
                console.log(err);
                setAlertInfo({ severity: "error", text: "Erro ao carregar dados" });
            });
    }

    return (
        <Box className={ styles.analises }>
            {
                alertInfo && (
                    <Alert
                        sx={{
                            position: "fixed",
                            bottom: "10px",
                            left: "10px",
                            zIndex: "99",
                        }}
                        severity={ alertInfo.severity! }
                        onClose={() => setAlertInfo(null)}
                    >
                        { alertInfo.text }
                    </Alert>
                )
            }

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

                    <Accordion
                        sx={{
                            borderRadius: '4px',
                        }}
                        disableGutters={true}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                        >
                            <Typography color="darkcyan" fontWeight="450">Adicionar dados</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl fullWidth className={ styles.controlGroup }>
                                <TextField
                                    value={newEstado}
                                    onChange={e => setNewEstado(e.target.value)}
                                    label="Nome do estado"
                                />
                            </FormControl>
                            <br /><br />

                            <FormControl fullWidth className={ styles.controlGroup }>
                                <TextField
                                    value={newSigla}
                                    onChange={e => setNewSigla(e.target.value)}
                                    label="Sigla do estado"
                                />
                            </FormControl>
                            <br /><br />

                            <FormControl fullWidth className={ styles.controlGroup }>
                                <Box className={ styles.uploadGroup }>
                                    <InputLabel>{file ? <CheckIcon /> : <AttachFileIcon />} {file ? file.name : "Selecione o arquivo..."}</InputLabel>
                                    <MuiFileInput
                                        inputProps={{ accept: '.pkl' }}
                                        sx={{ flex: '1 1' }}
                                        onChange={setFile} />
                                    <Button
                                        onClick={sendDatabase}
                                        variant="contained"
                                        disabled={file == null}
                                        sx={{
                                            color: "var(--main-accent-color)",
                                            flex: "0 0 min-content",
                                            padding: '0',
                                        }}>
                                        <FileUploadIcon />
                                    </Button>
                                </Box>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
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
