import { FC, useEffect, useState, ChangeEvent, ClipboardEvent } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Button, Drawer } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { models, Embed } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import styles from './report.module.css';

export const Report: FC = () => {
    const reportId = "5b857eb4-8437-4f23-b560-ee05e9097549",
          pVariables = [
              'Temperatura Média (C°)',
              'Precipitação Média (mm)',
              'Radiação Média (KJ/m²)',
          ],
          cities = [
              'Todas',
              'Brasília - DF',
              'Manaus - AM',
              'Porto Alegre - RS',
              'Rio de Janeiro - RJ',
              'Salvador - BA',
          ],
          reportUrl = `https://app.powerbi.com/reportEmbed?reportId=${reportId}`,
          tokenCookie = "powerbiToken";

    const [reportToken, setReportToken] = useState(localStorage.getItem(tokenCookie));
    const [reportKey, setReportKey] = useState(reportToken);
    const [embed, setEmbed] = useState<Embed>();
    const [filterOpen, setFilterOpen] = useState(false);
    const [updateToken, setUpdateToken] = useState(false);
    const [pVariable, setPVariable] = useState(pVariables[0]);
    const [city, setCity] = useState<string>(cities[0]);
    const [reportConfig, setReportConfig] = useState<models.IReportEmbedConfiguration>({
        type: 'report',
        embedUrl: reportUrl,
        accessToken: reportToken || '',
        id: reportId,
        tokenType: models.TokenType.Embed,
        settings: {
            panes: {
                pageNavigation: {
                    visible: false,
                },
                filters: {
                    expanded: false,
                    visible: false,
                }
            },
            background: models.BackgroundType.Transparent,
        },
        filters: [
            {
                $schema: "https://powerbi.com/product/schema#basic",
                target: {
                    table: "P_Variables",
                    column: "P_Variables"
                },
                //@ts-ignore
                operator: "is",
                values: [ pVariable ],
                filterType: models.FilterType.Basic,
                requireSingleSelection: true
            },
        ]
    });

    function changeP(event: SelectChangeEvent) {
        setPVariable(event.target.value);
    }

    function changeCity(event: SelectChangeEvent) {
        setCity(event.target.value);
    }

    function pasteToken(event: ClipboardEvent<HTMLDivElement>) {
        setUpdateToken(false);
        setReportToken(event.clipboardData.getData('text'));
    }

    function changeToken(event: ChangeEvent<HTMLInputElement>) {
        setUpdateToken(false);
        setReportToken(event.target.value);
    }

    async function setGlobalFilters() {
        setReportConfig({
            ...reportConfig,
            filters: [
                {
                    $schema: "https://powerbi.com/product/schema#basic",
                    target: {
                        table: "P_Variables",
                        column: "P_Variables"
                    },
                    //@ts-ignore
                    operator: "is",
                    values: [ pVariable ],
                    filterType: models.FilterType.Basic,
                    requireSingleSelection: true
                },
                {
                    $schema: "https://powerbi.com/product/schema#basic",
                    target: {
                        table: "Data",
                        column: "Cidade"
                    },
                    //@ts-ignore
                    operator: "is",
                    values: city !== cities[0] ? [ city ] : cities.slice(1),
                    filterType: models.FilterType.Basic,
                    requireSingleSelection: true
                }
            ],
        });
        embed?.configChanged(true);
    }

    useEffect(
        () => {
            setGlobalFilters();
        },
        [ pVariable, city ]
    )

    useEffect(
        () => {
            if (!reportToken)
                return;
            localStorage.setItem(tokenCookie, reportToken!);
            setUpdateToken(true);
        },
        [ reportToken ]
    )

    async function updateReportToken() {
        if (!reportToken || !reportToken.length)
            return;

        setReportConfig({
            ...reportConfig,
            accessToken: reportToken,
        });
        setReportKey(reportToken);
    }

    async function setupEmbed() {
        /* console.log("??");
         * console.log({...embed});
         * await embed?.setAccessToken(reportToken!)
         * console.log('a')
         * embed?.configChanged(true);
         * console.log('b')
         * await embed?.reload();
         * console.log('c') */
        setUpdateToken(false);
    }

    useEffect(() => { setupEmbed() }, [ reportConfig ]);

    return (
        <Box className={ styles.report }>
            <Box component="div" className={ styles.filterSidebar }>
                <Button
                    onClick={ () => setFilterOpen(true) }
                    variant="text"
                    sx={{
                        color: "var(--main-accent-color)",
                        width: "min-content",
                        minWidth: "min-content",
                        padding: '0',
                    }}
                    className={ styles.filterOpen }>
                    <KeyboardArrowRightIcon sx={{
                        strokeWidth: '2px',
                        stroke: 'var(--main-accent-color)',
                        fontSize: '3em',
                    }} />
                </Button>
            </Box>
            <Drawer
                sx={{
                    backgroundColor: 'transparent',
                    alignItems: 'stretch',
                    flexDirection: 'column',
                }}
                open={filterOpen}
                onClose={ () => setFilterOpen(false) }
            >
                <Box component="div" className={ styles.filters }>
                    <span>Filtros:</span>

                    <FormControl fullWidth className={ styles.controlGroup }>
                        <InputLabel>Variável de análise:</InputLabel>
                        <Select
                            value={`${pVariable}`}
                            label="Variável de análise"
                            onChange={changeP}
                        >
                            {
                                pVariables.map(v => (
                                    <MenuItem key={v} value={v}>{v}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    <FormControl fullWidth className={ styles.controlGroup }>
                        <InputLabel>Cidade:</InputLabel>
                        <Select
                            value={`${city}`}
                            label="Cidade analisada"
                            onChange={changeCity}
                        >
                            {
                                cities.map(v => (
                                    <MenuItem key={v} value={v}>{v}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    <br />
                    <br />
                    <span><a href="https://learn.microsoft.com/en-us/rest/api/power-bi/embed-token/generate-token#code-try-0">Token de acesso:</a></span>
                    <FormControl fullWidth>
                        <TextField value={reportToken || ''} onChange={changeToken} onPasteCapture={e => pasteToken(e)}></TextField>
                        <Button
                            variant="contained"
                            disabled={!updateToken}
                            startIcon={ <UpdateIcon /> }
                            className={ styles.updateBut }
                            onClick={ updateReportToken }
                        >Atualizar token</Button>
                    </FormControl>
                </Box>
            </Drawer>
            <PowerBIEmbed
                key={ reportKey }
                embedConfig={ reportConfig }
                eventHandlers = {
                new Map([
                    ['loaded', () => console.log("Report loaded")],
                    ['rendered', function () {console.log('Report rendered');}],
                    ['error', function (event: any) {console.log(event?.detail);}],
                    ['visualClicked', () => console.log('visual clicked')],
                    ['pageChanged', (event: any) => console.log(event)],
                ])
                }
                getEmbeddedComponent={(embedObject: Embed) => {
                    console.log(`Embedded object of type "${ embedObject.embedtype }" received`);
                    setEmbed(embedObject);
                }}
                cssClassName={ `${styles.reportIframe} ${reportToken ? '' : styles.hide}` }
            />
            <div className={ styles.reportIframe } style={{ 'display': reportToken ? 'none' : 'inherit' }}>
                <h3>Token ainda não definido!</h3>
            </div>
        </Box>
    );
}
