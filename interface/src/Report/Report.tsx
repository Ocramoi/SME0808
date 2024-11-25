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
        "H4sIAAAAAAAEAB2Tx66DVgAF_-VtiUQ1cCNlQTWYbjAYdvTeywWi_Htesp-zmaP5-8eOr26Ms58_f8gz-GY-NnYnCMA05APR98IcRHOKoTY4Sx7REuWYcmnC5dUUT1_AXfqph8pFsUbRZoBV5lDY1aiEFxotpXYBZLLasDE9WcHE5tyR7hPIRY69RtpJhwHZJ5vx9dllh7C_uN6v8ZXTWnEVF3GXTnPeQw05WyYH9xEybui90rkWqPwFywd_2h6fdsVJA76mAHWbUmCRlW5Z1n0GypWdlcABdOkjq7_23LPKQWsvO71PPDxEPoxGZ2f68qz3zClwuj5JqJpLO9nf_GRFM5HeV3pDLV5UXk2OZANpghANMxygiVy6NWnSfeTe8fl4SJhMus6sUUGuAke2TKhDFXML6N_reyvMZbfxGtPf_L0MAAAi7v3gxAQGidFTqmEzRtEQLmXgY8yYPgkQiO8EMd4LeuK6hpo4V8G2Qp4K8Q2vIatBFvbetc5JYN8mWvFDbIJb5R79Wj75CCOlzqzBEgxfAzapFUdJZrUrHuL5cxuJF990By_78S3IWqOGBaJJdS-oemcFREhKqq5FtrUU_lGORM0q3-2WRptTHy6eHTA2zmcyRtiOREuyEqllv9LqUoPPGGi6G2jUc08kDb7X7A4ZHIly6rpa2JIklxHOiWJ912O4SldOSVLF5hZ7OJlqVMiOqGpxlbN1718IczaqHqji14YWqazCxg8bttCY67Ybx5wDs2KjvsanOKrofPEEiW-QfMx-_W6lkPKIRkDr99uoX4T7qGDVtVC5WdFJAw5Iw3MtU7JmSFnxetkg_AxfmvG720Bw1pvCKzHvjM-7jBKSbafttQW4moCq_1xfkXMYX4jJlfHl8fPXzx8_wnJN26jl1286EShztpGuTy1xSI52zIHTcbHRG2FiMSBNYtQn-lHnb0p-s2nGmDE6pxcCitXS8JHi8B0ONWfpHOJav6tNbYx0WxLSPVZz6VZfIHVqZgQB3eVyK6hHe4dNeZfOuKaAjrfK58iY2xnpOIOu6w_u3lfw4OzKt1ApoAa4bg83bSJAW7-RHL2KpxPTxpFpOgLBaY9F3kcTptXzK7Bp4_IgnQ34zacJlvz5WvPDNxfop5crylSpYv6j-jIRilZrTg9PM1MiJbyeZ66IVDOCl-eRmrQTwfhRjYqdWi0HLz_hkcsf0pqdosTwRh1Vp2p2jO35kVEDDPJJf8eRcpunlci3EESSU5V__a_5mqp8Uf1fy8fXK5b6NLJZO-t6T0V7tkvnf8qtyyHe9iX_xewe-2p3MCpCLJ_-y3_jQoXAKIb5Is-chQrBjXtObOTkAMNHgC18w6HZ_FlCI9ic0isfixRpkqp0VYdCvpPMsFVYddnnRvXfsInvmofE-IEk_a0RpvQ8ngU0GvMoahYNUQNJQStz7nmTUC6Vy8PRWs01oabRlu7GcZn8kxVECXKgd9Okfo7XUan6k9DHb4fyQRUcm14dEwO3Z9yXhyOaRNNjKixUlcdwO4w_e3lZm32-FNfo7Atr22bHtnRDAYsfwv5gjgQfXwsLC1tBV8ENdgn7suklHBzmEjgBZrYISUM1ki3OE5OZhtd6-RWUszSNVrxuLqNZGxogrS72cB9ZFD7-O-OffwGDwfspLgYAAA==.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUJSQVpJTC1TT1VUSC1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImV4cCI6MTczMjUxNTg0OCwiYWxsb3dBY2Nlc3NPdmVyUHVibGljSW50ZXJuZXQiOnRydWV9",
    );
    const [embed, setEmbed] = useState<Embed>();
    const [filterOpen, setFilterOpen] = useState(false);
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

    async function updateReportToken() {
        setReportConfig({
            ...reportConfig,
            accessToken: reportToken,
        });
        embed?.configChanged(true);
    }

    return (
        <Box className={ styles.report }>
            <Box component="div" className={ styles.filterSidebar }>
                <Button
                    onClick={ () => setFilterOpen(true) }
                    variant="text"
                    className={ styles.filterOpen }
                    endIcon={ <KeyboardArrowRightIcon /> }>
                    Filtros
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
