import { FC, useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Button, Accordion, AccordionSummary, Typography, AccordionDetails, TextField, Alert } from '@mui/material';
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from '@mui/base/Unstable_NumberInput';

import { MuiFileInput } from 'mui-file-input';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckIcon from '@mui/icons-material/Check';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/system'
import styles from './analysis.module.css';
import axios from 'axios';

const infoValues = [
    "max",
    "min",
    "avg",
    "med",
    "mod",
    "size",
]

interface columnInfo {
    [key: string]: number
};

interface ufInfo {
    [uf: string]: {
        [column: string]: columnInfo
    }
};

interface EstadoInfo {
    label: string;
    value: string;
}

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
          [defasagem, setDefasagem] = useState(10),
          [imgLoading, setImgLoading] = useState(false),
          [colunas, setColunas] = useState<string[]>([]),
          [estados, setEstados] = useState<EstadoInfo[]>([{ label: '', value: '' }]),
          [funcs, _setFuncs] = useState([
              { label: 'Forecast', value: 'serieTemporal' },
              { label: 'Tendência', value: 'tendencia' },
              { label: 'Correlograma', value: 'correlograma' },
              { label: 'Correlograma múltiplas defasagens', value: 'multiCorr' },
              { label: 'Sazonalidade por estação', value: 'sazonalidadeEstacoes' },
              { label: 'Sazonalidade geral', value: 'sazonalidadeGeral' },
          ]),
          [func, setFunc] = useState(funcs[0].value);

    const apiBaseUrl = "http://localhost:5000";
    const StyledInputRoot = styled('div')(
        () => `
            font-family: 'IBM Plex Sans', sans-serif;
            font-weight: 400;
            border-radius: 4px;
            color: currentColor;
            background: transparent;
            border: 1px solid #bcbcbc;
            display: grid;
            grid-template-columns: 1fr 19px;
            grid-template-rows: 1fr 1fr;
            overflow: hidden;
            column-gap: 8px;
            padding: 4px;

            /* firefox */
            &:focus-visible {
                outline: 0;
            }
        `,
    );

    const StyledInputElement = styled('input')(
        () => `
            font-size: 1em;
            font-family: inherit;
            font-weight: 400;
            line-height: 1.5;
            grid-column: 1/2;
            grid-row: 1/3;
            color: currentColor;
            background: inherit;
            border: none;
            border-radius: inherit;
            padding: 8px 12px;
            outline: 0;
        `,
    );

    const StyledButton = styled('button')(
        () => `
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            appearance: none;
            padding: 0;
            width: 19px;
            height: 19px;
            font-family: system-ui, sans-serif;
            font-size: 0.875rem;
            line-height: 1;
            box-sizing: border-box;
            background: transparent;
            border: 0;
            color: currentColor;
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 120ms;

            &:hover {
                cursor: pointer;
            }

            &.${numberInputClasses.incrementButton} {
                grid-column: 2/3;
                grid-row: 1/2;
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
                border: 1px solid;
                border-bottom: 0;

                &:hover {
                cursor: pointer;
                background: var(--main-bg-color);
                color: var(--main-bg-color);
                }

            border-color: var(--main-bg-color);
            background: transparent;
            color: var(--main-bg-color);
        }

        &.${numberInputClasses.decrementButton} {
            grid-column: 2/3;
            grid-row: 2/3;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            border: 1px solid;

            &:hover {
                cursor: pointer;
            }

            border-color: var(--main-bg-color);
            background: transparent;
            color: var(--main-bg-color);
        }

        & .arrow {
            transform: translateY(-1px);
        }
        `);

    useEffect(() => {
        if (!update)
            return;

        Promise.all([
            axios
                .get(`${apiBaseUrl}/estados`)
                .then(response => setEstados((response.data?.data as EstadoInfo[]).sort((a, b) => a.label.localeCompare(b.label)))),
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
        if (!coluna.length || !func.length)
            return;
        setupInfo();
    }, [ coluna, func, janela ])

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

    function changeFunc(event: SelectChangeEvent) {
        setInfo(false);
        setFunc(event.target.value);
    };

    function changeJanela(event: SelectChangeEvent) {
        setInfo(false);
        setJanela(event.target.value);
    };

    useEffect(
        () => {
            setImgLoading(true);
        }, [
            estado,
            coluna,
            func,
            janela,
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

    function getParams() {
        if (['serieTemporal', 'tendencia'].includes(func))
            return [coluna, janela];
        else if(['correlograma', 'multiCorr'].includes(func))
            return [coluna, defasagem];
        else
            return [coluna];
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
                        <InputLabel>Função</InputLabel>
                        <Select
                            value={func}
                            label="Função de análise"
                            onChange={changeFunc}
                        >
                            {
                                funcs.map(v => (
                                    <MenuItem key={v.value} value={v.value}>{v.label}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    {["serieTemporal", "tendencia"].includes(func) && (
                        <FormControl fullWidth className={ styles.controlGroup }>
                            <InputLabel>Janela de análise</InputLabel>
                            <Select
                                value={`${janela}`}
                                label="Período analisado"
                                onChange={changeJanela}
                            >
                                <MenuItem value="1">Mês</MenuItem>
                                <MenuItem value="2">Dia</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {["correlograma", "multiCorr"].includes(func) && (
                        <FormControl fullWidth className={ styles.controlGroup }>
                            <span>Defasagem máxima [0 = nulo (quando válido)]:</span>
                            <BaseNumberInput
                                placeholder="Defasagem máxima"
                                min={0}
                                max={(stationData[estado] || {})[coluna]?.size || 0}
                                value={defasagem}
                                onInputChange={e => setDefasagem(parseInt(e.target.value ?? 0))}
                                slots={{
                                    root: StyledInputRoot,
                                    input: StyledInputElement,
                                    incrementButton: StyledButton,
                                    decrementButton: StyledButton,
                                }}
                                slotProps={{
                                    incrementButton: {
                                        children: '▴',
                                    },
                                    decrementButton: {
                                        children: '▾',
                                    },
                                }}
                            />
                        </FormControl>
                    )}

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
                                        inputProps={{ accept: '.pkl,.csv' }}
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
                <h3>Análise ({funcs.find(v => v.value == func)?.label}):</h3>
                {
                    info && (
                        <center className={ styles.infoDisplay }>
                            {
                                imgLoading && (
                                    <div className={ styles.innerLoader }></div>
                                )
                            }
                            <img
                                src={(info && estado && coluna && func) ? `${apiBaseUrl}/analise/${estado}/${func}/${JSON.stringify(getParams())}` : undefined}
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
                <h3>Dados de <i>{ coluna }</i> medida na estação do(a) <i>{ estados.find(v => v.value == estado)?.label }</i>:</h3>
                <br />
                <div className={ styles.pseudoTable }>
                    <span>Coluna</span>
                    <span><i>{coluna}</i></span>

                    <span>Máximo</span>
                    <span>{info ? (stationData[estado] ?? {})[coluna]?.max : '-'}</span>

                    <span>Mínimo</span>
                    <span>{info ? (stationData[estado] ?? {})[coluna]?.min : '-'}</span>

                    <span>Média</span>
                    <span>{info ? (stationData[estado] ?? {})[coluna]?.avg : '-'}</span>

                    <span>Mediana</span>
                    <span>{info ? (stationData[estado] ?? {})[coluna]?.med : '-'}</span>

                    <span>Moda</span>
                    <span>{info ? (stationData[estado] ?? {})[coluna]?.mod : '-'}</span>

                    <span>Número de entradas</span>
                    <span>{info ? (stationData[estado] ?? {})[coluna]?.size : '-'}</span>
                </div>
            </Box>
        </Box>
    );
}
