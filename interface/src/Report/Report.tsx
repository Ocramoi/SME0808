import { FC, useEffect, useState} from 'react';
import { Box } from '@mui/material';
import { models, Embed, Report as BIReport } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import styles from './report.module.css';
import axios from 'axios';

export const Report: FC = () => {
    const reportId = "5b857eb4-8437-4f23-b560-ee05e9097549",
          reportToken = "H4sIAAAAAAAEACXUt86sVgAE4Hf5WyyRk6VbkHNOCx2wh7zEJVp-d1_b_VTfaOavHze_hyl___z5Q4dC0JCJwSgwzOdbfmuhIOpjlV2EtvCvqc4CbzBMMLLDeZkX9aLOW1-tTzH7nWxQtLvGe0wdvGX6HfVNZLrg3XszQAWJ7t0Ema5ckqiqROx0D8vFOTHTwaERAZMa9cvaFPDONxVCfd5yBcuLGrV065l9iAf2lI6S1TowQ9iVbTZtT4xS5vxzWYXevFyVELaRVNKHIbpkZx2exzSc_1i9JTMVeMbrHATMgIz6yLYM1-Reg0wn_EotnjIPgTtOIUifkA0jcfc7tRr7swzFPehDapEuuYQ9QK9LVtOlO7S1qMUoilvMRJ0maOHDA9IKZy9GcTSVmhyNYl08UF9itOMXoygpHb-FBuqqSSYjTdVGZmltLbEjl61KJ9oyRR29xcEANOFTdOZHOLi0pIUUVBIIE3_LmH3IYWwWynUvwLXYyZzmCJeWPrhZTc3tsp5fr8uU3gpHoDT0SFP4jSmTVefjfbyZHrtPrCuypgNB4iiMTkPlBM0UnNfVh1K3Ml2m1CE_90uf7Ss2XKPBgWv4VtE2Ol4yVQgNyR2OtyaJzjsAaS3SXLEWl8oS7qCxmfJdA6rJyIKZjly4MlIfD9TVCGAa5KXNGECzqdettDOhYinRCmkC80qrwX4QfrxTT7Najcy8VM5g9C0CXlr4ZhB7_uqNpnG-u5oBy-xDm2UgZIE_sS_MYjn3qHnD-DV0oA6zx4WUgBX5xCQsaGf3pqs5j9qDxVO_11ewweKK3oDXSxDeLR4dwek1bV3JC4JKBFxBFJ4aHzbZjqm42zC4WfWAUHRFiYj2Hnt9r-VEc6iDqggWhpEp9r9-_vgR1nv-Tga4f0-Hx_xa1gfHmBUX1TlZDAFwkZxL11nDQurWBU6j562u-gElVX_jyjk8hyTwh7q9SAwFobUh41vEb8SlJt0UbZBKL7ipL6Oc7TZ6r-6bA7KJBCQVc-uTFoVV31f0DukCe-t76IknhJK-CpJ33s2eguwdz684mahYQLfmKDcS6KDyoBiRczB98vFWj2WgA-zu0F7bqbFnum9Jl2fDCI8xKcGLirdnOA8ucb2Izu52CpJl8vdydf185Iz42Grs0SXTbV9K8TKiUFCLfibIV0sxOcENhf-NWvvhFTjRZ_-IkZLIbJtNHKHXnVJYVK-nMjrbbxR0vc0kxFKu-DlJkHUKDaC74Pz1H_M9N2DV4t_K4D5v9GwX3dE-EdYEFdycx_-poK3H_Luv4N8yDuIWoMByvnMgEVL15ptS7x-EauVGY2VWrsICXMZXTSBxHl906vYsSjTQ2RgrUuR33xlFA2N5OdMi0mCso2pzeCULu7JnDA1PBjlzFrsH9uFeRtaVCNyL9ubOXGwIJr-NB50SrYWq69d32Q3fhNuOkTrl-bjs1fCzM_ZKt88-Z1GwPqrgsohVhBb2qTu5S_NZPBB21Mpb3FeRqtIo3GYkuLG3se2jjCvjgecUXATFs5iKrGCDpJp4i0DYm6MhVBrtzrJwaCQ5C5JHr0k_efX70_lFqBw0SIpEF3w1aby71UTFTFPwxXRS2GenRjW9UWXE7t0ITx3_fLK0D2TSwa25kKR_mf_-BzUNjZouBgAA.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUJSQVpJTC1TT1VUSC1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImV4cCI6MTczMDI0OTA4MSwiYWxsb3dBY2Nlc3NPdmVyUHVibGljSW50ZXJuZXQiOnRydWV9";

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
