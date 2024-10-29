import { FC, useEffect, useState} from 'react';
import { Box } from '@mui/material';
import { models, Embed, Report as BIReport } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import styles from './report.module.css';
import axios from 'axios';

export const Report: FC = () => {
    const reportId = "5b857eb4-8437-4f23-b560-ee05e9097549",
          reportToken = "H4sIAAAAAAAEAB2Tt66EVgBE_-W1WIIlY8kFOYflkjsyLDksyfK_-9n9NHPmzN8_Tnr3U1r8_Pkj0hD_2Ex0ezhA4rcDifcB0Iw8Ivn9HRziakoe8c3BsajiQx6q01yHEfowRFiFi03dfpLcAeoz0gBN8o82CCsO3ZXMEgA6MdPcHe5K399D7Fm_3HLui-ivz7OufcgEDB68ViSz6BTL2IL8Eh2pB8JnjvrS1Grji4R84-GpLcuYfLmQs4TtbRUR5_BNWbEDvGAPhZqF_BxUp7u0dLZa6HloxK98hN1GpjZWZsTAQ_LCb9pLsl-TdidTLJEoYfYVU_uJZSex4Yw7TmPycznqeEPjt6lL5-2aBBKqHP3NG95X8m3zK0hjp0g-7wLVrwqea2lFjY16FWBeIgNsz4ubadih1ovafKgOg3dPjxxtU046V5nm9DmFBTg2Ibpu1PkSufzcGAW6pHjfHdVykfZcKt6qNDNw3PFshheR7FVc7uhWskllWyqpkuMKZ0stQ69S0E4S50w4cm2WTPu8DqoPGePD7LNrUrixHQicKEXMJXujAd2KCXQEqEu84Q_hsdj66vb8UMtq9TNVHeIIKSr6qX19a0KzYSU9bFil5MG9qcmBaIbfhlrSe1MeFJrGQAmIGWFXUrItyUwInljSWVa4_IAzgwiXYRutsFaRDmcsDFty8YBW7A7gge05kBywNO_RKcPmoSFN-ZbzBGwnVfpmoWixDwJ2r2NyaS9G4-aXZrsygNutMJ7jNRv2mgXQk41Eus0oO44C9HUX-u1Ju27qNUNwaMnAlbp4exCBwn03vyKxeDa4Z9tjVp-svXEQpeWcs07RTPl84KbLxOYzKZcbYFxj-Zrqa1tz9gLJlsip2dSDqHvP_vXzxw-_3vM-6eX9ex15usswUezio94nfjEwUN-JoUEeYsojuD8f10Rq5nelTYw4UT3gESJh36g8PvaDdkdlFaSvxLrwYAO8VMwUnpwFV96LeJLSSFZJtLY5x1T5TjXyMcTUZ9R4H1uDc3h92aySczwKFlHTGv58G0F96263fd_09fHi1H8pa8Z5IO0yPRV4mI5HWY1yjZqYeU9X-9F7pQk-R4HJ00BEnIcP3qWhygyIkqg5jFQr_A7Fre-gQ65yhz4tY6dDR_iY1K2doCrdPpFk4WT5ygE46lFr2ZTU-oaMYCdqbQl2BGhlUYCFBgo3zGJB_SreSd19KtQw0Bu2y0IkKhoZin7fugPJLI0bvf_6H_M9N-WqBr-UlyvsypsmZhrJh6GYDt3Km_P_FGjrMd2_a_kbe2cz1nXHGOjDzZloVmrNKysrRdaJelp1pl0DrzP6oM6uW9C-595WH87rtTBq1abHX09eb5CPFqbB-UOkCAZrTIWzK78NFpynUu8lPti1PmTeGPvDDQ35aUPU0vRT4NfUi1-jrps--Sn7tMnjTdeaektVUguCX6fhQe5MTboLDJZu3F9yvYsdw5BSk3Yy8exWIdqW2SfxUBYTACKEgy8J63lg7EdHj1r5MnjcTYicPp9t8rIL71j_PaFhgoehS1QuyPHZtoVJTSxioY0-xGqh3hVaLgAjK3lYAqbHRfAKgeNM1je2oWy2E5iWFTRoWxoPPGCZ6qePSApfV-2s0_cZ2vt_mP_5F_SHccEuBgAA.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUJSQVpJTC1TT1VUSC1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImV4cCI6MTczMDI0NjMyMSwiYWxsb3dBY2Nlc3NPdmVyUHVibGljSW50ZXJuZXQiOnRydWV9";

    const [report, setReport] = useState<BIReport>();
    const [reportConfig, setReportConfig] = useState<models.IReportEmbedConfiguration>({
        type: 'report',
        embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportId}&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUJSQVpJTC1TT1VUSC1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d`,
        accessToken: reportToken,
        id: reportId,
        tokenType: models.TokenType.Embed,
        settings: {
            panes: {
                filters: {
                    expanded: false,
                    visible: false,
                }
            },
            background: models.BackgroundType.Transparent,
        }
    });

    useEffect(() => {
        if (!report)
            return;
        console.log(report);
    }, [ report ]);

    return (
        <Box className={ styles.report }>
            <Box component="div" className={ styles.filters }>
                <span>Filtros:</span>
            </Box>
            <PowerBIEmbed
                embedConfig={ reportConfig }
                eventHandlers = {
                new Map([
                    ['loaded', function () {console.log('Report loaded');}],
                    ['rendered', function () {console.log('Report rendered');}],
                    ['error', function (event: any) {console.log(event?.detail);}],
                    ['visualClicked', () => console.log('visual clicked')],
                    ['pageChanged', (event) => console.log(event)],
                ])
                }
                getEmbeddedComponent={(embedObject: Embed) => {
                    console.log(`Embedded object of type "${ embedObject.embedtype }" received`);
                    setReport(embedObject as BIReport);
                }}
                cssClassName={ styles.reportIframe }
            />
        </Box>
    );
}
