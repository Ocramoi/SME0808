import { FC, useEffect, useState, ChangeEvent } from 'react';
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
          reportUrl = `https://app.powerbi.com/reportEmbed?reportId=${reportId}`;

    const [reportToken, setReportToken] = useState(
        "H4sIAAAAAAAEAB2UxQ70hhaD3-XfplKYKnUR5gnjLsycTKC6735H3VtH9qdj__vHSp9hTos_f_8RKEzub1-jVu26AaUjKHqF3bxmXRIP4JW-B_D263yZQSb7hAERMGUc8qt2ax3fRrQqT7NEfqKqRbtiuMyafm9F1GQXqmmPbhlandS-omTGfYSxn7rQIk8oeSCOcvaIEY2uCg8R8-Ze6jqRAiI7Teb9s-Yfj7A6KkuCyhLMp5j6oH5wwlniwWm7nIcn01ibKAUCThLL9PU9Pj0lIMSJgC3dvbqiZV2Xw9T458Dlbiw3NQ47zZ6EWyAsoTbohTe55AThRMbbKGbSgG_dD8Nnqj63np4xtcJSip6GlNxh8KUVoGxizJffb4FfUY2OlBNtsudWkjOQefBzq9yQTQdxLNLoYWXaLrDkVP0QBwLqS5UQRkcx3fUlUTKPv8e4yL2zlgOAdhFID1mdInQ-V0mz88uUfpBeKy9EIMAg8lHg5KbKhWPd_bKBnWy-j0tY9pb3bH9i7LVud89VAXA3RSoR28yIcdyLdgBRLkWybQKvE9IeQoni4rQ2D69QwfJjIhykyB0QLs4dRc6B_KGZRMck5fDKjx1DakMReKeQ2KVzBFqZaiEz32OhEQB0fWWkFb0g4nJtj93poczrNLhVZmY8qyBBW6uO6084A6iHOI1CeDNryfD3tnb5i-UvzQV06hSgVSDfivQsUnM7amc7LzTHJRY-5rCnY6IBDJ7kwVWly6hfDUbDKGlrygRZ1RqznLtRmmKAE3rCrCqkZG3kV3wp83q-ZcUXpN9dA9gCOAXlp_a1GVY65Y1fbE7ADhjO693NWHaB5zBosIpUPErZsSgU6cyc-jNRwty2S7bBL7dynywZVVDUhX_-_PWH257lmLXy-VUn_VyUC4UsD7vpoMIEax6Yea3pLNLHcZkgdH_XaQBV40XcFWTE82SRUbevItWFfglMLL_4ozxTtLiDIpYA5UgRJrl2g4pghgipVhV7R3gfWwCXb6LKBrpvRDEiiC_GYcqQtgSQ3u-u5xhg9KDwoPhTsVKnq4P2bl0X528vu-UMVPAZ22WagYrlEJz6Pew9-4i5J60waQWZ4NeQ3Eh6Urpz92VldWnYDUjRcJR4Eh-f9ykXaA11JOgXtbCx7GavlhvpNt30vsrQ2ofWkWlsNOfB18srurTSxvsNQFy0rQE4OYA0MCsyumm_RXKt8TuS7ZgDXAc2r4TmQy7vVu8ZLhj7U_3Pf5ifpSk3JfhRBqWZ2RU5tpxjAgb5GUX70Zj_VG5bT-lxbuVPpo2ctSqDazkgE9MoYJe_BPIWD9K75RD2vO1-GfDH5zNgQMCyRMmwagY3UkzgSS8tPVJIElv5CS9dlO8V15om_BowOdGpHQ8blpoKblgVMIKc0X0O1I_schbngiN5JfQMINWY0GCHeXvDKc6c0hIWwHAhcuwadH2sCDe3yp1WEstn5KyunUWm22JMoKYGSqmdq3PNF2uyJWMZPxKR2ZV2Vbpf46k7-hDW7iC3onvs-2du6wnuaxcOnKfX7_lhNDEHOuyVJwubby076A1xA9JzXrdp_Fh76fXd7Lhml_Us0MVyjHcydNqL5GtSdr9Qf6PsYVZ0-YPwvC_EmkmZzD0KRsn1w_y__wPe9YuwLgYAAA==.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUJSQVpJTC1TT1VUSC1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImV4cCI6MTczNDA0Mzc4NywiYWxsb3dBY2Nlc3NPdmVyUHVibGljSW50ZXJuZXQiOnRydWV9"
    );
    const [embed, setEmbed] = useState<Embed>();
    const [filterOpen, setFilterOpen] = useState(false);
    const [updateToken, setUpdateToken] = useState(false);
    const [pVariable, setPVariable] = useState(pVariables[0]);
    const [city, setCity] = useState<string>(cities[0]);
    const [reportConfig, setReportConfig] = useState<models.IReportEmbedConfiguration>({
        type: 'report',
        embedUrl: reportUrl,
        accessToken: reportToken,
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

    function changeToken(event: ChangeEvent<HTMLInputElement>) {
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
            setUpdateToken(true);
        },
        [ reportToken ]
    )

    async function updateReportToken() {
        embed?.setAccessToken(reportToken)
        embed?.configChanged(true);
        embed?.reload();
        setUpdateToken(false);
    }

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
                        <TextField value={reportToken} onChange={changeToken}></TextField>
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
                cssClassName={ styles.reportIframe }
            />
        </Box>
    );
}
