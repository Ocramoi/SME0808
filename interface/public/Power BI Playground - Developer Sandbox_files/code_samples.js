//----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
//----------------------------------------------------------------------------

/*
This file contains the code samples which will appear live in the web-page.
Each sample method name starts with _{entity} (e.g _Report_, _Page, _Embed etc.) depends on which section it appears.
Please keep this.

We removed the first level of indentation from this file to avoid the need of removing it later on in the code.
Important - changes in global variables or function names may required changes in the Playground
*/

//////////////////////////////////////// IMPORTANT ////////////////////////////////////////
/// When changing this file, make sure to bump the version number in the following file ///
///      index.cshtml -> <script src="scripts/code_samples.js?version=X"></script>      ///
//////////////////////////////////////// IMPORTANT ////////////////////////////////////////

// ---- Embed Code ----------------------------------------------------

var EMBED_ACCESS_TOKEN;
var EMBED_URL;
var REPORT_ID;
var DASHBOARD_ID;
var TILE_ID;
var DATASET_ID;
var PAGE_NAME;
var VISUAL_NAME;
var TOKEN_TYPE;
var pbiLog;
var pbiLogEvent;

async function _Embed_BasicEmbed() {
let loadedResolve, reportLoaded = new Promise((res, rej) => { loadedResolve = res; });
let renderedResolve, reportRendered = new Promise((res, rej) => { renderedResolve = res; });

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// Embed a Power BI report in the given HTML element with the given configurations
// Read more about how to embed a Power BI report in your application here: https://go.microsoft.com/fwlink/?linkid=2153590
function embedPowerBIReport() {
    /*-----------------------------------------------------------------------------------+
    |    Don't change these values here: access token, embed URL and report ID.          | 
    |    To make changes to these values:                                                | 
    |    1. Save any other code changes to a text editor, as these will be lost.         |
    |    2. Select 'Start over' from the ribbon.                                         |
    |    3. Select a report or use an embed token.                                       |
    +-----------------------------------------------------------------------------------*/
    // Read embed application token
    let accessToken = EMBED_ACCESS_TOKEN;

    // Read embed URL
    let embedUrl = EMBED_URL;

    // Read report Id
    let embedReportId = REPORT_ID;

    // Read embed type from radio
    let tokenType = TOKEN_TYPE;

    // We give All permissions to demonstrate switching between View and Edit mode and saving report.
    let permissions = models.Permissions.All;

    // Create the embed configuration object for the report
    // For more information see https://go.microsoft.com/fwlink/?linkid=2153590
    let config = {
        type: 'report',
        tokenType: tokenType == '0' ? models.TokenType.Aad : models.TokenType.Embed,
        accessToken: accessToken,
        embedUrl: embedUrl,
        id: embedReportId,
        permissions: permissions,
        settings: {
            panes: {
                filters: {
                    visible: true
                },
                pageNavigation: {
                    visible: true
                }
            },
            bars: {
                statusBar: {
                    visible: true
                }
            }
        }
    };

    // Get a reference to the embedded report HTML element
    let embedContainer = $('#embedContainer')[0];

    // Embed the report and display it within the div container.
    report = powerbi.embed(embedContainer, config);

    // report.off removes all event handlers for a specific event
    report.off("loaded");

    // report.on will add an event handler
    report.on("loaded", function () {
        loadedResolve();
        report.off("loaded");
    });

    // report.off removes all event handlers for a specific event
    report.off("error");

    report.on("error", function (event) {
        pbiLogEvent(event.detail);
    });

    // report.off removes all event handlers for a specific event
    report.off("rendered");

    // report.on will add an event handler
    report.on("rendered", function () {
        renderedResolve();
        report.off("rendered");
    });
}

embedPowerBIReport();
await reportLoaded;

// Insert here the code you want to run after the report is loaded

await reportRendered;

// Insert here the code you want to run after the report is rendered

}

function _Embed_BasicEmbed_Mobile() {
// Read embed application token
let accessToken = EMBED_ACCESS_TOKEN;

// Read embed URL
let embedUrl = EMBED_URL;

// Read report Id
let embedReportId = REPORT_ID;

// Read embed type from radio
let tokenType = TOKEN_TYPE;

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// We give All permissions to demonstrate switching between View and Edit mode and saving report.
let permissions = models.Permissions.All;

// Create the embed configuration object for the report
// For more information see https://go.microsoft.com/fwlink/?linkid=2153698
let config = {
    type: 'report',
    tokenType: tokenType == '0' ? models.TokenType.Aad : models.TokenType.Embed,
    accessToken: accessToken,
    embedUrl: embedUrl,
    id: embedReportId,
    permissions: permissions,
    pageName: /*>>>*/"ReportSectioneb8c865100f8508cc533"/*<<<*/,
    settings: {
        panes: {
            filters: {
                visible: false
            }
        },
        bars: {
            statusBar: {
                visible: true
            }
        },
        layoutType: models.LayoutType.MobilePortrait
    }
};

// Get a reference to the embedded report HTML element
let embedContainer = $('#embedContainerMobile')[0];

// Embed the report and display it within the div container.
report = powerbi.embed(embedContainer, config);

// report.off removes all event handlers for a specific event
report.off("loaded");

// report.on will add an event handler
report.on("loaded", function () {
    // Event handler code
});

// report.off removes all event handlers for a specific event
report.off("rendered");

// report.on will add an event handler
report.on("rendered", function () {
    // Event handler code
});

// report.off removes all event handlers for a specific event
report.off("error");

report.on("error", function (event) {
    pbiLogEvent(event.detail);
});

report.off("saved");
report.on("saved", function (event) {
    if (event.detail.saveAs) {
        pbiLogEvent(event.detail, '\nIn order to interact with the new report, create a new token and load the new report');
    }
    else {
        pbiLogEvent(event.detail);
    }
});
}

// ---- Paginated Embed Code ----------------------------------------------------
function _Embed_PaginatedReportBasicEmbed() {
// Read embed application token
let accessToken = EMBED_ACCESS_TOKEN;

// Read embed URL
let embedUrl = EMBED_URL;

// Read paginated report Id
let embedReportId = REPORT_ID;

// Read embed type from radio
let tokenType = TOKEN_TYPE;

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// Se view permissions.
let permissions = models.Permissions.View;

// Create the embed configuration object for the paginated report
// For more information see https://go.microsoft.com/fwlink/?linkid=2153700
let config = {
    type: 'report',
    tokenType: tokenType == '0' ? models.TokenType.Aad : models.TokenType.Embed,
    accessToken: accessToken,
    embedUrl: embedUrl,
    id: embedReportId,
    permissions: permissions,
};

// Get a reference to the paginated embedded report HTML element
let embedContainer = $('#paginatedReportEmbedContainer')[0];

// Embed the paginated report and display it within the div container.
paginatedReport = powerbi.embed(embedContainer, config);

pbiLog("Loading Paginated Report.");
}

function _Embed_PaginatedReportBasicEmbed_Mobile() {
// Read embed application token
let accessToken = EMBED_ACCESS_TOKEN;

// Read embed URL
let embedUrl = EMBED_URL;

// Read paginated report Id
let embedReportId = REPORT_ID;

// Read embed type from radio
let tokenType = TOKEN_TYPE;

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// Se view permissions.
let permissions = models.Permissions.View;  

// Create the embed configuration object for the paginated report
// For more information see https://go.microsoft.com/fwlink/?linkid=2153700
let config = {
    type: 'report',
    tokenType: tokenType == '0' ? models.TokenType.Aad : models.TokenType.Embed,
    accessToken: accessToken,
    embedUrl: embedUrl,
    id: embedReportId,
    permissions: permissions,
};

// Get a reference to the paginated embedded report HTML element
let embedContainer = $('#paginatedReportEmbedContainerMobile')[0];

// Embed the paginated report and display it within the div container.
paginatedReport = powerbi.embed(embedContainer, config);

pbiLog("Loading Paginated Report.");
}

function _Embed_VisualEmbed() {
// Read embed application token
let accessToken = EMBED_ACCESS_TOKEN;

// Read embed URL
let embedUrl = EMBED_URL;

// Read report Id
let reportId = REPORT_ID;

// Read page name
let pageName = PAGE_NAME;

// Read visual name
let embedVisualName = VISUAL_NAME;

// Read embed type from radio
let tokenType = TOKEN_TYPE;

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// Create the embed configuration object for the report visual
// For more information see https://go.microsoft.com/fwlink/?linkid=2153591
let config = {
    type: 'visual',
    tokenType: tokenType == '0' ? models.TokenType.Aad : models.TokenType.Embed,
    accessToken: accessToken,
    embedUrl: embedUrl,
    id: reportId,
    pageName: pageName,
    visualName: embedVisualName,
    settings: {
        bars: {
            statusBar: {
                visible: true
            }
        }
    }
};

// Get a reference to the embedded report HTML element
let embedContainer = $('#visualEmbedContainer')[0];

// Embed the report and display it within the div container.
visual = powerbi.embed(embedContainer, config);

// visual.off removes all event handlers for a specific event
visual.off("loaded");

// visual.on will add an event handler
visual.on("loaded", function () {
    // Event handler code
});

// visual.off removes all event handlers for a specific event
visual.off("rendered");

// visual.on will add an event handler
visual.on("rendered", function () {
    // Event handler code
});

// visual.off removes all event handlers for a specific event
visual.off("error");

visual.on("error", function (event) {
    pbiLogEvent(event.detail);
});
}

function _Embed_VisualEmbed_Mobile() {
// Read embed application token
let accessToken = EMBED_ACCESS_TOKEN;

// Read embed URL
let embedUrl = EMBED_URL;

// Read report Id
let reportId = REPORT_ID;

// Read page name
let pageName = PAGE_NAME;

// Read visual name
let embedVisualName = VISUAL_NAME;

// Read embed type from radio
let tokenType = TOKEN_TYPE;

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// Create the embed configuration object for the report visual
// For more information see https://go.microsoft.com/fwlink/?linkid=2153591
let config = {
    type: 'visual',
    tokenType: tokenType == '0' ? models.TokenType.Aad : models.TokenType.Embed,
    accessToken: accessToken,
    embedUrl: embedUrl,
    id: reportId,
    pageName: pageName,
    visualName: embedVisualName,
    settings: {
        bars: {
            statusBar: {
                visible: true
            }
        }
    }
};

// Get a reference to the embedded report HTML element
let embedContainer = $('#visualEmbedContainerMobile')[0];

// Embed the report and display it within the div container.
visual = powerbi.embed(embedContainer, config);

// visual.off removes all event handlers for a specific event
visual.off("loaded");

// visual.on will add an event handler
visual.on("loaded", function () {
    // Event handler code
});

// visual.off removes all event handlers for a specific event
visual.off("rendered");

// visual.on will add an event handler
visual.on("rendered", function () {
    // Event handler code
});

// visual.off removes all event handlers for a specific event
visual.off("error");

visual.on("error", function (event) {
    pbiLogEvent(event.detail);
});
}

function _Embed_DashboardEmbed() {
// Read embed application token
let accessToken = EMBED_ACCESS_TOKEN;

// Read embed URL
let embedUrl = EMBED_URL;

// Read dashboard Id
let embedDashboardId = DASHBOARD_ID;

// Read embed type from radio
let tokenType = TOKEN_TYPE;

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// Create the embed configuration object for the dashboard
// For more information see https://go.microsoft.com/fwlink/?linkid=2153701
let config = {
    type: 'dashboard',
    tokenType: tokenType == '0' ? models.TokenType.Aad : models.TokenType.Embed,
    accessToken: accessToken,
    embedUrl: embedUrl,
    id: embedDashboardId,
    pageView: 'fitToWidth'
};

// Get a reference to the embedded dashboard HTML element
let embedContainer = $('#dashboardEmbedContainer')[0];

// Embed the dashboard and display it within the div container.
dashboard = powerbi.embed(embedContainer, config);

// dashboard.off removes all event handlers for a specific event
dashboard.off("loaded");

// dashboard.on will add an event handler
dashboard.on("loaded", function () {
    // Event handler code
});

// dashboard.off removes all event handlers for a specific event
dashboard.off("error");

dashboard.on("error", function (event) {
    pbiLogEvent(event.detail);
});

dashboard.off("tileClicked");
dashboard.on("tileClicked", function (event) {
    pbiLogEvent(event.detail);
});
}

function _Embed_DashboardEmbed_Mobile() {
// Read embed application token
let accessToken = EMBED_ACCESS_TOKEN;

// Read embed URL
let embedUrl = EMBED_URL;

// Read dashboard Id
let embedDashboardId = DASHBOARD_ID;

// Read embed type from radio
let tokenType = TOKEN_TYPE;

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// Create the embed configuration object for the dashboard
// For more information see https://go.microsoft.com/fwlink/?linkid=2153701
let config = {
    type: 'dashboard',
    tokenType: tokenType == '0' ? models.TokenType.Aad : models.TokenType.Embed,
    accessToken: accessToken,
    embedUrl: embedUrl,
    id: embedDashboardId,
    pageView: 'oneColumn'
};

// Get a reference to the embedded dashboard HTML element
let embedContainer = $('#dashboardEmbedContainerMobile')[0];

// Embed the dashboard and display it within the div container.
dashboard = powerbi.embed(embedContainer, config);

// dashboard.off removes all event handlers for a specific event
dashboard.off("loaded");

// dashboard.on will add an event handler
dashboard.on("loaded", function () {
    // Event handler code
});

// dashboard.off removes all event handlers for a specific event
dashboard.off("error");

dashboard.on("error", function (event) {
    pbiLogEvent(event.detail);
});

dashboard.off("tileClicked");
dashboard.on("tileClicked", function (event) {
    pbiLogEvent(event.detail);
});
}

function _Embed_BasicEmbed_EditMode() {
// Read embed application token
let accessToken = EMBED_ACCESS_TOKEN;

// Read embed URL
let embedUrl = EMBED_URL;

// Read report Id
let embedReportId = REPORT_ID;

// Read embed type from radio
let tokenType = TOKEN_TYPE;

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// Create the embed configuration object for the report
// For more information see https://go.microsoft.com/fwlink/?linkid=2153590
let config = {
    type: 'report',
    tokenType: tokenType == '0' ? models.TokenType.Aad : models.TokenType.Embed,
    accessToken: accessToken,
    embedUrl: embedUrl,
    id: embedReportId,
    permissions: models.Permissions.All /*gives maximum permissions*/,
    viewMode: models.ViewMode.Edit,
    settings: {
        panes: {
            filters: {
                visible: true
            },
            pageNavigation: {
                visible: true
            }
        }
    }
};

// Get a reference to the embedded report HTML element
let embedContainer = $('#embedContainer')[0];

// Embed the report and display it within the div container.
report = powerbi.embed(embedContainer, config);

// report.off removes all event handlers for a specific event
report.off("loaded");

// report.on will add an event handler
report.on("loaded", function () {
    // Event handler code
});

// report.off removes all event handlers for a specific event
report.off("rendered");

// report.on will add an event handler
report.on("rendered", function () {
    // Event handler code
});

report.off("error");
report.on("error", function (event) {
    pbiLogEvent(event.detail);
});

report.off("saved");
report.on("saved", function (event) {
    if (event.detail.saveAs) {
        pbiLogEvent(event.detail, '\nIn order to interact with the new report, create a new token and load the new report');
    }
    else {
        pbiLogEvent(event.detail);
    }
});
}

function _Embed_MobileEditNotSupported() {
// Edit mode is not supported on mobile.
}

function _Embed_MobileCreateNotSupported() {
// Create mode is not supported on mobile.
}

function _Embed_EmbedWithDefaultFilter() {
let accessToken = EMBED_ACCESS_TOKEN;
let embedUrl = EMBED_URL;
let embedReportId = REPORT_ID;

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

const filter = {
    $schema: "http://powerbi.com/product/schema#basic",
    target: {
        table: /*>>>*/"Geo"/*<<<*/,
        column: /*>>>*/"Region"/*<<<*/
    },
    operator: /*>>>*/"In"/*<<<*/,
    values: [/*>>>*/"West"/*<<<*/]
};

let embedConfiguration = {
    type: 'report',
    tokenType: models.TokenType.Embed,
    accessToken: accessToken,
    embedUrl: embedUrl,
    id: embedReportId,
    settings: {
        panes: {
            filters: {
                visible: false
            },
            pageNavigation: {
                visible: false
            }
        }
    },
    filters: [filter]
};

let embedContainer = document.getElementById('embedContainer');
powerbi.embed(embedContainer, embedConfiguration);
}

function _Embed_TileEmbed() {
// Read embed application token
let accessToken = EMBED_ACCESS_TOKEN;

// Read embed URL
let embedUrl = EMBED_URL;

// Read dashboard Id
let embedDashboardId = DASHBOARD_ID;

// Read tile Id
let embedTileId = TILE_ID;

// Read embed type from radio
let tokenType = TOKEN_TYPE;

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// Create the embed configuration object for the dashboard tile
// For more information see https://go.microsoft.com/fwlink/?linkid=2153702
let config = {
    type: 'tile',
    tokenType: tokenType == '0' ? models.TokenType.Aad : models.TokenType.Embed,
    accessToken: accessToken,
    embedUrl: embedUrl,
    id: embedTileId,
    dashboardId: embedDashboardId
};

// Get a reference to the embedded tile HTML element
let embedContainer = $('#tileEmbedContainer')[0];

// Embed the tile and display it within the div container.
tile = powerbi.embed(embedContainer, config);

// tile.off removes all event handlers for a specific event
tile.off("tileLoaded");

// tile.on will add an event handler
tile.on("tileLoaded", function (event) {
    // Event handler code
});

// tile.off removes all event handlers for a specific event
tile.off("tileClicked");

// tile.on will add an event handler which prints to Log window.
tile.on("tileClicked", function (event) {
    pbiLogEvent("Tile clicked event\n", event.detail);
});
}

function _Embed_TileEmbed_Mobile() {
// Read embed application token
let accessToken = EMBED_ACCESS_TOKEN;

// Read embed URL
let embedUrl = EMBED_URL;

// Read dashboard Id
let embedDashboardId = DASHBOARD_ID;

// Read tile Id
let embedTileId = TILE_ID;

// Read embed type from radio
let tokenType = TOKEN_TYPE;

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// Create the embed configuration object for the dashboard tile
// For more information see https://go.microsoft.com/fwlink/?linkid=2153702
let config = {
    type: 'tile',
    tokenType: tokenType == '0' ? models.TokenType.Aad : models.TokenType.Embed,
    accessToken: accessToken,
    embedUrl: embedUrl,
    id: embedTileId,
    dashboardId: embedDashboardId
};

// Get a reference to the embedded tile HTML element
let embedContainer = $('#tileEmbedContainerMobile')[0];

// Embed the tile and display it within the div container.
tile = powerbi.embed(embedContainer, config);

// tile.off removes all event handlers for a specific event
tile.off("tileLoaded");

// tile.on will add an event handler
tile.on("tileLoaded", function (event) {
    // Event handler code
});

// tile.off removes all event handlers for a specific event
tile.off("tileClicked");

// tile.on will add an event handler which prints to Log window.
tile.on("tileClicked", function (event) {
    pbiLogEvent("Tile clicked event\n", event.detail);
});
}

function _Embed_Create() {
// Read embed application token
let accessToken = EMBED_ACCESS_TOKEN;

// Read embed URL
let embedUrl = EMBED_URL;

// Read dataset Id
let embedDatasetId = DATASET_ID;

// Read embed type from radio
let tokenType = TOKEN_TYPE;

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// Embed create configuration used to describe the what and how to create report.
// This object is used when calling powerbi.createReport.
let embedCreateConfiguration = {
    tokenType: tokenType == '0' ? models.TokenType.Aad : models.TokenType.Embed,
    accessToken: accessToken,
    embedUrl: embedUrl,
    datasetId: embedDatasetId,
};

// Grab the reference to the div HTML element that will host the report
let embedContainer = $('#embedContainer')[0];

// Create report
report = powerbi.createReport(embedContainer, embedCreateConfiguration);

// report.off removes all event handlers for a specific event
report.off("loaded");

// report.on will add an event handler
report.on("loaded", function () {
    // Event handler code
});

// report.off removes all event handlers for a specific event
report.off("rendered");

// report.on will add an event handler
report.on("rendered", function () {
    // Event handler code
});

report.off("error");
report.on("error", function (event) {
    pbiLogEvent(event.detail);
});

// report.off removes all event handlers for a specific event
report.off("saved");
report.on("saved", function (event) {
    pbiLogEvent(event.detail, '\nIn order to interact with the new report, create a new token and load the new report');
});
}

function _Embed_QnaEmbed() {
// Read embed application token
let accessToken = EMBED_ACCESS_TOKEN;

// Read embed URL
let embedUrl = EMBED_URL;

// Read dataset Id
let embedDatasetId = DATASET_ID;

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// 0 - Show Q&A, 1 - Show Q&A, use predefined question, 2 - Show answer only, use predefined question
let viewMode = models.QnaMode[0];

// Create the embed configuration object for the Q&A visual
// For more information see https://go.microsoft.com/fwlink/?linkid=2153592
let config = {
    type: 'qna',
    tokenType: models.TokenType.Embed,
    accessToken: accessToken,
    embedUrl: embedUrl,
    datasetIds: [embedDatasetId],
    viewMode: viewMode
};

// Get a reference to the embedded Q&A HTML element
let qnaContainer = $('#qnaEmbedContainer')[0];

// Embed the Q&A and display it within the div container.
qna = powerbi.embed(qnaContainer, config);
}

function _Embed_QnaEmbed_Mobile() {
// Read embed application token
let accessToken = EMBED_ACCESS_TOKEN;

// Read embed URL
let embedUrl = EMBED_URL;

// Read dataset Id
let embedDatasetId = DATASET_ID;

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// 0 - Show Q&A, 1 - Show Q&A, use predefined question, 2 - Show answer only, use predefined question
let viewMode = models.QnaMode[0];

// Create the embed configuration object for the Q&A visual
// For more information see https://go.microsoft.com/fwlink/?linkid=2153592
let config = {
    type: 'qna',
    tokenType: models.TokenType.Embed,
    accessToken: accessToken,
    embedUrl: embedUrl,
    datasetIds: [embedDatasetId],
    viewMode: viewMode
};

// Get a reference to the embedded Q&A HTML element
let qnaContainer = $('#qnaEmbedContainerMobile')[0];

// Embed the Q&A and display it within the div container.
qna = powerbi.embed(qnaContainer, config);
}

function _Embed_QnaEmbed_PredefinedQuestion() {
// Read embed application token
let accessToken = EMBED_ACCESS_TOKEN;

// Read embed URL
let embedUrl = EMBED_URL;

// Read dataset Id
let embedDatasetId = DATASET_ID;

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// Interactive or ResultOnly modes
let viewMode = models.QnaMode.Interactive;

// use predefined question
let question = '2014 total units YTD var % by month, manufacturer as clustered column chart';

// Create the embed configuration object for the Q&A visual
// For more information see https://go.microsoft.com/fwlink/?linkid=2153592
let config = {
    type: 'qna',
    tokenType: models.TokenType.Embed,
    accessToken: accessToken,
    embedUrl: embedUrl,
    datasetIds: [embedDatasetId],
    viewMode: viewMode,
    question: question
};

// Get a reference to the embedded Q&A HTML element
let qnaContainer = $('#qnaEmbedContainer')[0];

// Embed the Q&A and display it within the div container.
qna = powerbi.embed(qnaContainer, config);
}

function _Embed_QnaEmbed_PredefinedQuestion_Mobile() {
// Read embed application token
let accessToken = EMBED_ACCESS_TOKEN;

// Read embed URL
let embedUrl = EMBED_URL;

// Read dataset Id
let embedDatasetId = DATASET_ID;

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// Interactive or ResultOnly modes
let viewMode = models.QnaMode.Interactive;

// use predefined question
let question = '2014 total units YTD var % by month, manufacturer as clustered column chart';

// Create the embed configuration object for the Q&A visual
// For more information see https://go.microsoft.com/fwlink/?linkid=2153592
let config = {
    type: 'qna',
    tokenType: models.TokenType.Embed,
    accessToken: accessToken,
    embedUrl: embedUrl,
    datasetIds: [embedDatasetId],
    viewMode: viewMode,
    question: question
};

// Get a reference to the embedded Q&A HTML element
let qnaContainer = $('#qnaEmbedContainerMobile')[0];

// Embed the Q&A and display it within the div container.
qna = powerbi.embed(qnaContainer, config);
}

function _Embed_QnaEmbed_Aad() { /* comment out */
// Read embed application token
let accessToken = EMBED_ACCESS_TOKEN;

// Read embed URL
let embedUrl = EMBED_URL;

// Read dataset Id
let embedDatasetId = DATASET_ID;

// 0 - Show Q&A, 1 - Show Q&A, use predefined question, 2 - Show answer only, use predefined question
let viewMode = models.QnaMode[0];

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// Create the embed configuration object for the Q&A visual
// For more information see https://go.microsoft.com/fwlink/?linkid=2153592
let config = {
    type: 'qna',
    tokenType: models.TokenType.Aad,
    accessToken: accessToken,
    embedUrl: embedUrl,
    datasetIds: [embedDatasetId],
    viewMode: viewMode
};

// Get a reference to the embedded Q&A HTML element
let qnaContainer = $('#qnaEmbedContainer')[0];

// Embed the Q&A and display it within the div container.
qna = powerbi.embed(qnaContainer, config);
}

function _Embed_QnaEmbed_Aad_Mobile() { /* comment out */
// Read embed application token
let accessToken = EMBED_ACCESS_TOKEN;

// Read embed URL
let embedUrl = EMBED_URL;

// Read dataset Id
let embedDatasetId = DATASET_ID;

// 0 - Show Q&A, 1 - Show Q&A, use predefined question, 2 - Show answer only, use predefined question
let viewMode = models.QnaMode[0];

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// Create the embed configuration object for the Q&A visual
// For more information see https://go.microsoft.com/fwlink/?linkid=2153592
let config = {
    type: 'qna',
    tokenType: models.TokenType.Aad,
    accessToken: accessToken,
    embedUrl: embedUrl,
    datasetIds: [embedDatasetId],
    viewMode: viewMode
};

// Get a reference to the embedded Q&A HTML element
let qnaContainer = $('#qnaEmbedContainerMobile')[0];

// Embed the Q&A and display it within the div container.
qna = powerbi.embed(qnaContainer, config);
}

// ---- Report Operations ----------------------------------------------------

function _Report_GetId() {
// Retrieve the report id.
let reportId = report.getId();

pbiLog("Report id: \"" + reportId + "\"");
}

function _ReportVisual_GetId() {
// Retrieve the visual id.
let visualId = visual.getId();

pbiLog("Visual id: \"" + visualId + "\"");
}

async function _Report_UpdateSettings() {
// The new settings that you want to apply to the report.
const newSettings = {
    panes: {
        filters: {
            visible: /*>>>*/false/*<<<*/
        },
        pageNavigation: {
            visible: /*>>>*/true/*<<<*/
        }
    }
};

// Update the settings by passing in the new settings you have configured.
try {
    await report.updateSettings(newSettings);
    pbiLog("Filter pane was removed.");
}
catch (error) {
    pbiLog(error);
}
}

async function _Report_GetPages() {
// Retrieve the page collection and loop through to collect the
// page name and display name of each page and display the value.
try {
    const pages = await report.getPages();
    let log = "Report pages:";
    pages.forEach(function (page) {
        log += "\n" + page.name + " - " + page.displayName;
    });
    pbiLog(log);
}
catch (error) {
    pbiLog(error);
}
}

async function _Report_SetPage() {
// setPage will change the selected view to the page you indicate.
// This is the actual page name not the display name.
const pageName = /*>>>*/"ReportSectiona271643cba2213c935be"/*<<<*/
try {
    await report.setPage(pageName);
    pbiLog(`Page was set to: ${pageName}`);
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Report_GetActivePage() {
// Get the current active page
try {
    const activePage = await report.getActivePage();

    pbiLog("The active page is \"" + activePage.name + "\" with display name \"" + activePage.displayName + "\"");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Report_GetFilters() {
// Get the filters applied to the report.
try {
    const filters = await report.getFilters();
    pbiLog(filters);
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Report_AddFilters() {
// Create the filter object. For more information see https://go.microsoft.com/fwlink/?linkid=2153364
const filter = {
    $schema: "http://powerbi.com/product/schema#basic",
    target: {
        table: /*>>>*/"Geo"/*<<<*/,
        column: /*>>>*/"Region"/*<<<*/
    },
    operator: /*>>>*/"In"/*<<<*/,
    values: [/*>>>*/"West", "Central"/*<<<*/]
};

// Add the filter to the report's filters.
try {
    await report.updateFilters(models.FiltersOperations.Add, [filter]);
    pbiLog("Report filter was added.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Report_ReplaceAllFilters() {
// Create the filter object. For more information see https://go.microsoft.com/fwlink/?linkid=2153364
const filter = {
    $schema: "http://powerbi.com/product/schema#basic",
    target: {
        table: /*>>>*/"Geo"/*<<<*/,
        column: /*>>>*/"Region"/*<<<*/
    },
    operator: /*>>>*/"In"/*<<<*/,
    values: [/*>>>*/"West"/*<<<*/]
};

// Replace all report's filters.
try {
    await report.updateFilters(models.FiltersOperations.ReplaceAll, [filter]);
    pbiLog("All the report filters were replaced.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Report_ReplaceFilters() {
// Create the filter object. For more information see https://go.microsoft.com/fwlink/?linkid=2153364
const filter = {
    $schema: "http://powerbi.com/product/schema#basic",
    target: {
        table: /*>>>*/"Geo"/*<<<*/,
        column: /*>>>*/"Region"/*<<<*/
    },
    operator: /*>>>*/"In"/*<<<*/,
    values: [/*>>>*/"Central"/*<<<*/]
};

// Replace report's filters with the same target data field.
try {
    await report.updateFilters(models.FiltersOperations.Replace, [filter]);
    pbiLog("Report filters were replaced.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Report_RemoveFilters() {
// Remove the filters currently applied to the report.
try {
    await report.updateFilters(models.FiltersOperations.RemoveAll);
    pbiLog("Report filters were removed.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _ReportVisual_Report_AddFilters() {
// Create the filter object. For more information see https://go.microsoft.com/fwlink/?linkid=2153364
const filter = {
    $schema: "http://powerbi.com/product/schema#basic",
    target: {
        table: /*>>>*/"Date"/*<<<*/,
        column: /*>>>*/"Months"/*<<<*/
    },
    operator: /*>>>*/"In"/*<<<*/,
    values: [/*>>>*/"Oct", "Nov", "Dec"/*<<<*/]
};

// Add the filter to the report's filters.
try {
    await visual.updateFilters(models.FiltersOperations.Add, [filter], models.FiltersLevel.Report);
    pbiLog("Report filter was added.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _ReportVisual_Report_ReplaceAllFilters() {
// Create the filter object. For more information see https://go.microsoft.com/fwlink/?linkid=2153364
const filter = {
    $schema: "http://powerbi.com/product/schema#basic",
    target: {
        table: /*>>>*/"Date"/*<<<*/,
        column: /*>>>*/"Months"/*<<<*/
    },
    operator: /*>>>*/"In"/*<<<*/,
    values: [/*>>>*/"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"/*<<<*/]
};

// Replace all report's filters.
try {
    await visual.updateFilters(models.FiltersOperations.ReplaceAll, [filter], models.FiltersLevel.Report);
    pbiLog("All the report filters were replaced.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _ReportVisual_Report_ReplaceFilters() {
// Create the filter object. For more information see https://go.microsoft.com/fwlink/?linkid=2153364
const filter = {
    $schema: "http://powerbi.com/product/schema#basic",
    target: {
        table: /*>>>*/"Date"/*<<<*/,
        column: /*>>>*/"Months"/*<<<*/
    },
    operator: /*>>>*/"In"/*<<<*/,
    values: [/*>>>*/"Jul", "Aug", "Sep"/*<<<*/]
};

// Replace report's filters with the same target data field.
try {
    await visual.updateFilters(models.FiltersOperations.Replace, [filter], models.FiltersLevel.Report);
    pbiLog("Report filters were replaced.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _ReportVisual_Report_GetFilters() {
// Get the filters applied to the report.
try {
    const filters = await visual.getFilters(models.FiltersLevel.Report);
    pbiLog(filters);
}
catch (errors) {
    pbiLog(errors);
}
}

async function _ReportVisual_Report_RemoveFilters() {
// Remove the filters currently applied to the report.
try {
    await visual.removeFilters(models.FiltersLevel.Report);
    pbiLog("Report filters were removed.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _ReportVisual_Page_AddFilters() {
// Create the filter object. For more information see https://go.microsoft.com/fwlink/?linkid=2153364
const filter = {
    $schema: "http://powerbi.com/product/schema#basic",
    target: {
        table: /*>>>*/"Date"/*<<<*/,
        column: /*>>>*/"Months"/*<<<*/
    },
    operator: /*>>>*/"In"/*<<<*/,
    values: [/*>>>*/"Oct", "Nov", "Dec"/*<<<*/]
};

// Add the filter to the page's filters.
try {
    await visual.updateFilters(models.FiltersOperations.Add, [filter], models.FiltersLevel.Page);
    pbiLog("Page filter was added.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _ReportVisual_Page_ReplaceAllFilters() {
// Create the filter object. For more information see https://go.microsoft.com/fwlink/?linkid=2153364
const filter = {
    $schema: "http://powerbi.com/product/schema#basic",
    target: {
        table: /*>>>*/"Date"/*<<<*/,
        column: /*>>>*/"Months"/*<<<*/
    },
    operator: /*>>>*/"In"/*<<<*/,
    values: [/*>>>*/"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"/*<<<*/]
};

// Replace all page's filters.
try {
    await visual.updateFilters(models.FiltersOperations.ReplaceAll, [filter], models.FiltersLevel.Page);
    pbiLog("All the page filters were replaced.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _ReportVisual_Page_ReplaceFilters() {
// Create the filter object. For more information see https://go.microsoft.com/fwlink/?linkid=2153364
const filter = {
    $schema: "http://powerbi.com/product/schema#basic",
    target: {
        table: /*>>>*/"Date"/*<<<*/,
        column: /*>>>*/"Months"/*<<<*/
    },
    operator: /*>>>*/"In"/*<<<*/,
    values: [/*>>>*/"Jul", "Aug", "Sep"/*<<<*/]
};

// Replace page's filters with the same target data field.
try {
    await visual.updateFilters(models.FiltersOperations.Replace, [filter], models.FiltersLevel.Page);
    pbiLog("Page filters were replaced.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _ReportVisual_Page_GetFilters() {
// Get the filters applied to the page.
try {
    const filters = await visual.getFilters(models.FiltersLevel.Page);
    pbiLog(filters);
}
catch (errors) {
    pbiLog(errors);
}
}

async function _ReportVisual_Page_RemoveFilters() {
// Remove the filters currently applied to the page.
try {
    await visual.removeFilters(models.FiltersLevel.Page);
    pbiLog("Page filters were removed.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _ReportVisual_Visual_AddFilters() {
// Create the filter object. For more information see https://go.microsoft.com/fwlink/?linkid=2153364
const filter = {
    $schema: "http://powerbi.com/product/schema#basic",
    target: {
        table: /*>>>*/"Date"/*<<<*/,
        column: /*>>>*/"Months"/*<<<*/
    },
    operator: /*>>>*/"In"/*<<<*/,
    values: [/*>>>*/"Oct", "Nov", "Dec"/*<<<*/]
};

// Add the filter to the visual's filters.
try {
    await visual.updateFilters(models.FiltersOperations.Add, [filter]);
    pbiLog("Visual filter was added.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _ReportVisual_Visual_ReplaceAllFilters() {
// Create the filter object. For more information see https://go.microsoft.com/fwlink/?linkid=2153364
const filter = {
    $schema: "http://powerbi.com/product/schema#basic",
    target: {
        table: /*>>>*/"Date"/*<<<*/,
        column: /*>>>*/"Months"/*<<<*/
    },
    operator: /*>>>*/"In"/*<<<*/,
    values: [/*>>>*/"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"/*<<<*/]
};

// Replace all visual's filters.
try {
    await visual.updateFilters(models.FiltersOperations.ReplaceAll, [filter]);
    pbiLog("All the visual filters were replaced.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _ReportVisual_Visual_ReplaceFilters() {
// Create the filter object. For more information see https://go.microsoft.com/fwlink/?linkid=2153364
const filter = {
    $schema: "http://powerbi.com/product/schema#basic",
    target: {
        table: /*>>>*/"Date"/*<<<*/,
        column: /*>>>*/"Months"/*<<<*/
    },
    operator: /*>>>*/"In"/*<<<*/,
    values: [/*>>>*/"Jul", "Aug", "Sep"/*<<<*/]
};

// Replace visual's filters with the same target data field.
try {
    await visual.updateFilters(models.FiltersOperations.Replace, [filter]);
    pbiLog("Visual filters were replaced.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _ReportVisual_Visual_GetFilters() {
// Get the filters applied to the visual.
try {
    const filters = await visual.getFilters();
    pbiLog(filters);
}
catch (errors) {
    pbiLog(errors);
}
}

async function _ReportVisual_Visual_RemoveFilters() {
// Remove the filters currently applied to the visual.
try {
    await visual.updateFilters(models.FiltersOperations.RemoveAll);
    pbiLog("Visual filters were removed.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Report_PrintCurrentReport() {
// Trigger the print dialog for your browser.
try {
    await report.print();
}
catch (errors) {
    pbiLog(errors);
}
}

async function _ReportVisual_PrintCurrentReport() {
// Trigger the print dialog for your browser.
try {
    await visual.print();
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Report_Reload() {
// Reload the displayed report
try {
    await report.reload();
}
catch (errors) {
    pbiLog(errors);
}
}

async function _ReportVisual_Reload() {
// Reload the displayed visual
try {
    await visual.reload();
}
catch (errors) {
    pbiLog(errors);
}
}

async function _PaginatedReport_Reload() {
// Reload the displayed paginated report
try {
    await paginatedReport.reload();
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Report_Refresh() {
// Refresh the displayed report
try {
    await report.refresh();
    pbiLog("Refreshed");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _ReportVisual_Refresh() {
// Refresh the displayed visual
try {
    await visual.refresh();
    pbiLog("Refreshed");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Report_ApplyCustomLayout() {
// Define default visual layout: visible in 400x300.
let defaultLayout = {
    width: /*>>>*/400/*<<<*/,
    height: /*>>>*/250/*<<<*/,
    displayState: {
        mode: models.VisualContainerDisplayMode.Hidden
    }
};

// Define page size as custom size: 1000x580.
let pageSize = {
    type: models.PageSizeType.Custom,
    width: /*>>>*/1000/*<<<*/,
    height: /*>>>*/580/*<<<*/
};

// Page layout: two visible visuals in fixed position.
let pageLayout = {
    defaultLayout: defaultLayout,
    visualsLayout: {
        /*>>>*/"VisualContainer1"/*<<<*/: {
            x: /*>>>*/70/*<<<*/,
            y: /*>>>*/100/*<<<*/,
            displayState: {
                mode: models.VisualContainerDisplayMode.Visible
            }
        },
        /*>>>*/"VisualContainer3"/*<<<*/: {
            x: /*>>>*/540/*<<<*/,
            y: /*>>>*/100/*<<<*/,
            displayState: {
                mode: models.VisualContainerDisplayMode.Visible
            }
        }
    }
};

let settings = {
    layoutType: models.LayoutType.Custom,
    customLayout: {
        pageSize: pageSize,
        displayOption: models.DisplayOption.FitToPage,
        pagesLayout: {
            /*>>>*/"ReportSection600dd9293d71ade01765"/*<<<*/: pageLayout
        }
    },
    panes: {
        filters: {
            visible: false
        },
        pageNavigation: {
            visible: false
        }
    }
}

// Update the settings by passing in the new settings you have configured.
try {
    await report.updateSettings(settings);
    pbiLog("Custom layout applied, to remove custom layout, reload the report using 'Reload' API.");
}
catch (error) {
    pbiLog(error);
}
}

async function _Report_HideAllVisualHeaders() {
// New settings to hide all the visual headers in the report
const newSettings = {
    visualSettings: {
        visualHeaders: [
            {
                settings: {
                    visible: false
                }
                // No selector - Hide visual header for all the visuals in the report
            }
        ]
    }
};

// Update the settings by passing in the new settings you have configured.
try {
    await report.updateSettings(newSettings);
    pbiLog("Visual header was successfully hidden for all the visuals in the report.");
}
catch (error) {
    pbiLog(error);
}
}

async function _ReportVisual_HideVisualHeader() {

// New settings to hide the visual header
const newSettings = {
    visualSettings: {
        visualHeaders: [
            {
                settings: {
                    visible: false
                }
            }
        ]
    }
};

// Update the settings by passing in the new settings you have configured.
try {
    await visual.updateSettings(newSettings);
    pbiLog("Visual header is now hidden.");
}
catch (error) {
    pbiLog(error);
}
}

async function _Report_ShowAllVisualHeaders() {
// New settings to show all the visual headers in the report
const newSettings = {
    visualSettings: {
        visualHeaders: [
            {
                settings: {
                    visible: true
                }
                // No selector - Show visual header for all the visuals in the report
            }
        ]
    }
};

// Update the settings by passing in the new settings you have configured.
try {
    await report.updateSettings(newSettings);
    pbiLog("Visual header was successfully shown for all the visuals in the report.");
}
catch (error) {
    pbiLog(error);
}
}

async function _ReportVisual_ShowVisualHeader() {
// New settings to show the visual header
const newSettings = {
    visualSettings: {
        visualHeaders: [
            {
                settings: {
                    visible: true
                }
            }
        ]
    }
};

// Update the settings by passing in the new settings you have configured.
try {
    await visual.updateSettings(newSettings);
    pbiLog("Visual header is now visible.");
}
catch (error) {
    pbiLog(error);
}
}

async function _Report_HideSingleVisualHeader() {
// Define settings to hide the header of a single visual
let newSettings = {
    visualSettings: {
        visualHeaders: [
            {
                settings: {
                    visible: true
                }
                // No selector - Show visual header for all the visuals in the report
            },
            {
                settings: {
                    visible: false
                },
                selector: {
                    $schema: "http://powerbi.com/product/schema#visualSelector",
                    visualName: /*>>>*/"VisualContainer4"/*<<<*/
                    // The visual name can be retrieved using getVisuals()
                    // Hide visual header for a single visual only
                }
            }
        ]
    }
};

// Update the settings by passing in the new settings you have configured.
try {
    await report.updateSettings(newSettings);
    pbiLog("Visual header was successfully hidden for 'Category Breakdown' visual.");
}
catch (error) {
    pbiLog(error);
}
}

async function _Report_SetTheme() {
// Create a theme.
const theme = {
    "name": /*>>>*/"Sample Theme"/*<<<*/,
    "dataColors": /*>>>*/["#990011", "#cc1144", "#ee7799", "#eebbcc", "#cc4477", "#cc5555", "#882222", "#A30E33"]/*<<<*/,
    "background": /*>>>*/"#FFFFFF"/*<<<*/,
    "foreground": /*>>>*/"#007799"/*<<<*/,
    "tableAccent": /*>>>*/"#990011"/*<<<*/
};

// Update the theme by passing in the custom theme.
// Some theme properties might not be applied if your report has custom colors set.
try {
    await report.applyTheme({themeJson: theme});
    pbiLog("Custom theme applied, to remove custom theme, reload the report using 'Reload' API.");
}
catch (error) {
    pbiLog(error);
}
}

function _Report_FullScreen() {
// Displays the report in full screen mode.
report.fullscreen();
}

function _ReportVisual_FullScreen() {
// Displays the visual in full screen mode.
visual.fullscreen();
}

function _Report_ExitFullScreen() {
// Exits full screen mode.
report.exitFullscreen();
}

function _ReportVisual_ExitFullScreen() {
// Exits full screen mode.
visual.exitFullscreen();
}

// ---- PaginatedReport Operations ----------------------------------------------------

function _PaginatedReport_GetId() {
// Retrieve the report id.
let reportId = paginatedReport.getId();

pbiLog("Paginated report id: \"" + reportId + "\"");
}

function _PaginatedReport_FullScreen() {
// Displays the paginated report in full screen mode.
paginatedReport.fullscreen();
}

function _PaginatedReport_ExitFullScreen() {
// Exits full screen mode.
paginatedReport.exitFullscreen();
}

function _Report_switchModeEdit() {
// Switch to edit mode.
report.switchMode("edit");
}

function _Report_switchModeView() {
// Switch to view mode.
report.switchMode("view");
}

function _Report_save() {
// Save report
// Note: The sample report can’t be saved.
report.save();
}

function _Report_saveAs() {
let saveAsParameters = {
    name: /*>>>*/"newReport"/*<<<*/
};

// SaveAs report
// Note: The sample report can’t be saved.
report.saveAs(saveAsParameters);
}

async function _Report_Extensions_OptionsMenu() {
const base64Icon = /*>>>*/"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAu9JREFUeJzt3U9OE2Ech/FnSiKsXbh340pg5Qk8gofAY3gGtBqWXsKNIR5BF0ZkQ9h6A2pC62LAEP5ITdv3R+f7fJJ3QUh4ZzpPmaaZmReGZxf4ABwDE2C24Jhc/K33wE7D/dB/2gIOgCmLH/S7xhQYA5uN9klz2gK+sLoDf30cXsypB+KAdgf/coyb7Jnutctq/+3/63Sw3WD/VmpUvQFL8BroCubtgL2CeXXNMe3f/ZfjqMH+rVTFO2fZJsCjwrnX+sPgEAKYFc+/1q/hED4DaAEGEM4AwhlAOAMIZwDhDCCcAYQzgHAGEM4AwhlAOAMIZwDhDCCcAYQzgHAGEM4AwhlAOAMIZwDhDCCcAYQzgHAGEM4AwhlAOAMIZwDhDCCcAYQzgHAGEM4AwhlAOAMIZwDhDCDcbQEs+3n7qx7Vqvf/vjH3egctnrfvqB13rnfQ+nn7jtrxd72DDXpj4BVK8RR4DHzq6M/5X1nzZ97qv82A3Q3gDfCidltUoAOmHf0nxGfFG6MaPztqn7evWpOO/lygUH4TGM4AwhlAOAMIZwDhDCCcAYQzgHAGEM4AwhlAOAMIZwDhDCCcAYQbAb+rN0JlJiPgtHorVOZkRH+NuDIddvS3C33Dy8LTTLm4LPwX8AQvDU/zDvh4+cMm/amg+pYlR5vxmVuuBN+iv0XMm0OHO86Bfa4c/NvO+9vAHvCS/h6yG3eSaq1MgBP6//AHwPervxzCB79Z8fxr/Rr6TWA4AwhnAOEMIJwBhDOAcAYQzgDCGUA4AwhnAOEMIJwBhDOAcAYQzgDCGUA4AwhnAOEMIJwBhDOAcAYQzgDCGUA4AwhnAOEMIJwBhDOAcAYQzgDCGUA4AwhnAOEMIJwBhDOAcAYQbggBVK53MCmceymGEMBp4dwnhXMvxRACqFzvwLUWHoAdah5wfQ48b7B/msOY9gHsN9kzzaX1ege3Pm9ftVqsd3Djeft6eLbpl0M5As5Y/KCfAT+AtwzwnP8HNwiKJyPkCoYAAAAASUVORK5CYII="/*<<<*/;

// The new settings that you want to apply to the report.
const newSettings = {
    extensions: [
        {
            command: {
                name: /*>>>*/"extension command"/*<<<*/,
                title: /*>>>*/"Extend commands"/*<<<*/,
                icon: base64Icon,
                extend: {
                    // Define visualOptionsMenu to extend options menu
                    visualOptionsMenu: {
                        // Define title to override default title.
                        // You can override default icon as well.
                        title: /*>>>*/"Extend options menu"/*<<<*/,
                    }
                }
            }
        }
    ]
};

// Update the settings by passing in the new settings you have configured.
try {
    await report.updateSettings(newSettings);
}
catch (error) {
    pbiLog(error);
}

// report.off removes all event handlers for a specific event
report.off("commandTriggered");

// report.on will add an event handler to commandTriggered event which prints to console window.
report.on("commandTriggered", function (event) {
    let commandDetails = event.detail;
    pbiLogEvent("Event - commandTriggered:\n", commandDetails);
});

// Select Run and open options menu to see new added items.
// Click on menu items added and you should see an entry in the Log window.

pbiLog("Open visual options menu by clicking the three dots icon and click on added items to see events in Log window.");
}

async function _ReportVisual_Extensions_OptionsMenu() {
const base64Icon = /*>>>*/"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAu9JREFUeJzt3U9OE2Ech/FnSiKsXbh340pg5Qk8gofAY3gGtBqWXsKNIR5BF0ZkQ9h6A2pC62LAEP5ITdv3R+f7fJJ3QUh4ZzpPmaaZmReGZxf4ABwDE2C24Jhc/K33wE7D/dB/2gIOgCmLH/S7xhQYA5uN9klz2gK+sLoDf30cXsypB+KAdgf/coyb7Jnutctq/+3/63Sw3WD/VmpUvQFL8BroCubtgL2CeXXNMe3f/ZfjqMH+rVTFO2fZJsCjwrnX+sPgEAKYFc+/1q/hED4DaAEGEM4AwhlAOAMIZwDhDCCcAYQzgHAGEM4AwhlAOAMIZwDhDCCcAYQzgHAGEM4AwhlAOAMIZwDhDCCcAYQzgHAGEM4AwhlAOAMIZwDhDCCcAYQzgHAGEM4AwhlAOAMIZwDhDCDcbQEs+3n7qx7Vqvf/vjH3egctnrfvqB13rnfQ+nn7jtrxd72DDXpj4BVK8RR4DHzq6M/5X1nzZ97qv82A3Q3gDfCidltUoAOmHf0nxGfFG6MaPztqn7evWpOO/lygUH4TGM4AwhlAOAMIZwDhDCCcAYQzgHAGEM4AwhlAOAMIZwDhDCCcAYQbAb+rN0JlJiPgtHorVOZkRH+NuDIddvS3C33Dy8LTTLm4LPwX8AQvDU/zDvh4+cMm/amg+pYlR5vxmVuuBN+iv0XMm0OHO86Bfa4c/NvO+9vAHvCS/h6yG3eSaq1MgBP6//AHwPervxzCB79Z8fxr/Rr6TWA4AwhnAOEMIJwBhDOAcAYQzgDCGUA4AwhnAOEMIJwBhDOAcAYQzgDCGUA4AwhnAOEMIJwBhDOAcAYQzgDCGUA4AwhnAOEMIJwBhDOAcAYQzgDCGUA4AwhnAOEMIJwBhDOAcAYQbggBVK53MCmceymGEMBp4dwnhXMvxRACqFzvwLUWHoAdah5wfQ48b7B/msOY9gHsN9kzzaX1ege3Pm9ftVqsd3Djeft6eLbpl0M5As5Y/KCfAT+AtwzwnP8HNwiKJyPkCoYAAAAASUVORK5CYII="/*<<<*/;

// The new settings that you want to apply to the visual.
const newSettings = {
    extensions: [
        {
            command: {
                name: /*>>>*/"extension command"/*<<<*/,
                title: /*>>>*/"Extend commands"/*<<<*/,
                icon: base64Icon,
                extend: {
                    // Define visualOptionsMenu to extend options menu
                    visualOptionsMenu: {
                        // Define title to override default title.
                        // You can override default icon as well.
                        title: /*>>>*/"Extend options menu"/*<<<*/,
                    }
                }
            }
        }
    ]
};

// Update the settings by passing in the new settings you have configured.
try {
    await visual.updateSettings(newSettings);
}
catch (error) {
    pbiLog(error);
}

// visual.off removes all event handlers for a specific event
visual.off("commandTriggered");

// visual.on will add an event handler to commandTriggered event which prints to console window.
visual.on("commandTriggered", function (event) {
    let commandDetails = event.detail;
    pbiLogEvent("Event - commandTriggered:\n", commandDetails);
});

// Select Run and open options menu to see new added items.
// Click on menu items added and you should see an entry in the Log window.

pbiLog("Open visual options menu by clicking the three dots icon and click on added items to see events in Log window.");
}

async function _Report_Hide_OptionsMenu() {
try {
    await report.removeOptionsMenuCommand("extension command", "Extend options menu");
}
catch (error) {
    if (error == "PowerBIEntityNotFound") {
        pbiLog("Options menu is undefined. Please run 'Extend options menu' first.")
    }
    else {
        pbiLog(error);
    }
}
}

async function _Report_Extensions_ContextMenu() {
// The new settings that you want to apply to the report.
const newSettings = {
    extensions: [
        {
            command: {
                name: /*>>>*/"extension command"/*<<<*/,
                title: /*>>>*/"Extend command"/*<<<*/,
                extend: {
                    // Define visualContextMenu to extend context menu.
                    visualContextMenu: {
                        // Define title to override default title.
                        //You can override default icon as well.
                        title: /*>>>*/"Extend context menu"/*<<<*/,
                    }
                }
            }
        }
    ]
};

// Update the settings by passing in the new settings you have configured.
try {
    await report.updateSettings(newSettings);
}
catch (error) {
    pbiLog(error);
}

// report.off removes all event handlers for a specific event
report.off("commandTriggered");

// report.on will add an event handler to commandTriggered event which prints to console window.
report.on("commandTriggered", function (event) {
    let commandDetails = event.detail;
    pbiLogEvent("Event - commandTriggered:\n", commandDetails);
});

// Select Run and context menu (i.e. by right click on data points) to see new added items.
// Click on menu items added and you should see an entry in the Log window.

pbiLog("Open visual context menu by right click on data points and click on added items to see events in Log window.");
}

async function _ReportVisual_Extensions_ContextMenu() {
// The new settings that you want to apply to the visual.
const newSettings = {
    extensions: [
        {
            command: {
                name: /*>>>*/"extension command"/*<<<*/,
                title: /*>>>*/"Extend command"/*<<<*/,
                extend: {
                    // Define visualContextMenu to extend context menu.
                    visualContextMenu: {
                        // Define title to override default title.
                        //You can override default icon as well.
                        title: /*>>>*/"Extend context menu"/*<<<*/,
                    }
                }
            }
        }
    ]
};

// Update the settings by passing in the new settings you have configured.
try {
    await visual.updateSettings(newSettings);
}
catch (error) {
    pbiLog(error);
}

// visual.off removes all event handlers for a specific event
visual.off("commandTriggered");

// visual.on will add an event handler to commandTriggered event which prints to console window.
visual.on("commandTriggered", function (event) {
    let commandDetails = event.detail;
    pbiLogEvent("Event - commandTriggered:\n", commandDetails);
});

// Select Run and context menu (i.e. by right click on data points) to see new added items.
// Click on menu items added and you should see an entry in the Log window.

pbiLog("Open visual context menu by right click on data points and click on added items to see events in Log window.");
}

async function _Report_Hide_ContextMenu() {
try {
    await report.removeContextMenuCommand("extension command", "Extend context menu")
}
catch (error) {
    if (error == "PowerBIEntityNotFound") {
        pbiLog("Context menu is undefined. Please run 'Extend context menu' first.")
    }
    else {
        pbiLog(error);
    }
}
}

async function _Visual_Operations_SortVisualBy() {
// Build the sort request.
// For more information, See https://go.microsoft.com/fwlink/?linkid=2153365
const sortByRequest = {
    orderBy: {
        table: /*>>>*/"Geo"/*<<<*/,
        column: /*>>>*/"Region"/*<<<*/
    },
    direction: /*>>>*/models.SortDirection.Descending/*<<<*/
};

// Retrieve the page collection and get the visuals for the active page.
try {
    const pages = await report.getPages();

    // Retrieve the page that contain the visual. For the sample report it will be the active page
    let page = pages.filter(function (page) {
        return /*>>>*/page.isActive/*<<<*/
    })[0];

    const visuals = await page.getVisuals();

    // Retrieve the target visual.
    let visual = visuals.filter(function (visual) {
        return visual.name === /*>>>*/"VisualContainer6"/*<<<*/;
    })[0];

    // Sort the visual's data by direction and data field.
    await visual.sortBy(sortByRequest);
    pbiLog("\"Total Category Volume Over Time by Region\" visual was sorted according to the request.");
}
catch (errors) {
    pbiLog(errors);
}
}

// ---- Page Operations ----------------------------------------------------

async function _Page_SetActive() {
// Retrieve the page collection, and then set the second page to be active.
try {
    const pages = await report.getPages();
    await pages[/*>>>*/3/*<<<*/].setActive();
    pbiLog("Active page was set to: \"" + pages[/*>>>*/3/*<<<*/].displayName + "\"");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Page_GetFilters() {
// Retrieve the page collection and get the filters for the active page.
try {
    const pages = await report.getPages();
    // Retrieve the page that contain the filters. For the sample report it will be the active page
    let page = pages.filter(function (page) {
        return /*>>>*/page.isActive/*<<<*/
    })[0];

    const filters = await page.getFilters();
    pbiLog(filters);
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Page_GetVisuals() {
// Retrieve the page collection and get the visuals for the active page.
try {
    const pages = await report.getPages();
    // Retrieve the page that contain the visual. For the sample report it will be the active page
    let page = pages.filter(function (page) {
        return /*>>>*/page.isActive/*<<<*/
    })[0];

    const visuals = await page.getVisuals();
    pbiLog(
        visuals.map(function (visual) {
            return {
                name: visual.name,
                type: visual.type,
                title: visual.title,
                layout: visual.layout
            };
        }));
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Page_AddFilters() {
// Create the filter object. For more information see https://go.microsoft.com/fwlink/?linkid=2153364
const filter = {
    $schema: "http://powerbi.com/product/schema#basic",
    target: {
        table: /*>>>*/"Geo"/*<<<*/,
        column: /*>>>*/"Region"/*<<<*/
    },
    operator: /*>>>*/"In"/*<<<*/,
    values: [/*>>>*/"West"/*<<<*/]
};

// Retrieve the page collection and then add the filter to the active page's filters.
try {
    const pages = await report.getPages();
    // Retrieve the active page.
    let page = pages.filter(function (page) {
        return /*>>>*/page.isActive/*<<<*/
    })[0];

    await page.updateFilters(models.FiltersOperations.Add, [filter]);
    pbiLog("Page filter was added.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Page_ReplaceAllFilters() {
// Create the filter object. For more information see https://go.microsoft.com/fwlink/?linkid=2153364
const filter = {
    $schema: "http://powerbi.com/product/schema#basic",
    target: {
        table: /*>>>*/"Geo"/*<<<*/,
        column: /*>>>*/"Region"/*<<<*/
    },
    operator: /*>>>*/"In"/*<<<*/,
    values: [/*>>>*/"East"/*<<<*/]
};

// Retrieve the page collection and then replace all filters for the active page.
try {
    const pages = await report.getPages();
    // Retrieve the active page.
    let page = pages.filter(function (page) {
        return /*>>>*/page.isActive/*<<<*/
    })[0];

    await page.updateFilters(models.FiltersOperations.ReplaceAll, [filter]);
    pbiLog("All the page filters were replaced.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Page_ReplaceFilters() {
// Create the filter object. For more information see https://go.microsoft.com/fwlink/?linkid=2153364
const filter = {
    $schema: "http://powerbi.com/product/schema#basic",
    target: {
        table: /*>>>*/"Geo"/*<<<*/,
        column: /*>>>*/"Region"/*<<<*/
    },
    operator: /*>>>*/"In"/*<<<*/,
    values: [/*>>>*/"Central"/*<<<*/]
};

// Retrieve the page collection and then replace filters with the same target data field for the active page.
try {
    const pages = await report.getPages();
    // Retrieve the active page.
    let page = pages.filter(function (page) {
        return /*>>>*/page.isActive/*<<<*/
    })[0];

    await page.updateFilters(models.FiltersOperations.Replace, [filter]);
    pbiLog("Page filters were replaced.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Page_RemoveFilters() {
// Retrieve the page collection and remove the filters for the active page.
try {
    const pages = await report.getPages();
    // Retrieve the active page.
    let page = pages.filter(function (page) {
        return /*>>>*/page.isActive/*<<<*/
    })[0];

    await page.updateFilters(models.FiltersOperations.RemoveAll);
    pbiLog("Page filters were removed.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Page_HasLayout() {
// Retrieve the page collection and check if the first page has a MobilePortrait layout.
try {
    const pages = await report.getPages();
    const hasLayout = await pages[/*>>>*/0/*<<<*/].hasLayout(models.LayoutType.MobilePortrait);

    let hasLayoutText = hasLayout ? "has" : "doesn't have";
    pbiLog("Page \"" + pages[/*>>>*/0/*<<<*/].name + "\" " + hasLayoutText + " mobile portrait layout.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Page_GetSlicers() {
// Retrieve the page collection and get the slicers for the active page.
try {
    const pages = await report.getPages();

    // Retrieve the active page.
    let pageWithSlicer = pages.filter(function (page) {
        return /*>>>*/page.isActive/*<<<*/;
    })[0];

    const visuals = await pageWithSlicer.getVisuals();

    // Retrieve all visuals with the type "slicer".
    let slicers = visuals.filter(function (visual) {
        return visual.type === "slicer";
    });

    slicers.forEach(async (slicer) => {
        // Get the slicer state.
        const state = await slicer.getSlicerState();
        pbiLog("Slicer name: \"" + slicer.name + "\"\nSlicer state:\n", state);
    });
}
catch (errors) {
    pbiLog(errors);
}
}

// ---- Tile Operations ----------------------------------------------------

async function _Tile_Reload() {
// Reload the displayed tile
try {
    await tile.reload();
}
catch (errors) {
    pbiLog(errors);
}
}

// ---- Event Listener ----------------------------------------------------

function _Events_PageChanged() {
// report.off removes all event handlers for a specific event
report.off("pageChanged");

// report.on will add an event listener.
report.on("pageChanged", function (event) {
    let page = event.detail.newPage;
    pbiLogEvent("Event - pageChanged:\nPage changed to \"" + page.name + "\" - \"" + page.displayName + "\"");
});

// Select Run and change to a different page.
// You should see an entry in the Log window.

pbiLog("Select different page to see events in Log window.");
}

function _Events_DataSelected() {
// report.off removes all event handlers for a specific event
report.off("dataSelected");

// report.on will add an event listener.
report.on("dataSelected", function (event) {
    let data = event.detail;
    pbiLogEvent("Event - dataSelected:\n", data);
});

// Select Run and select an element of a visualization.
// For example, a bar in a bar chart. You should see an entry in the Log window.

pbiLog("Select data to see events in Log window.");
}

function _Events_SaveAsTriggered() {
// report.off removes all event handlers for a specific event
report.off("saveAsTriggered");

// report.on will add an event listener.
report.on("saveAsTriggered", function (event) {
    pbiLogEvent(event);
});

// Select Run and then select SaveAs.
// You should see an entry in the Log window.

pbiLog("Select SaveAs to see events in Log window.");
}

function _Events_BookmarkApplied() {
// report.off removes all event handlers for a specific event
report.off("bookmarkApplied");

// report.on will add an event listener.
report.on("bookmarkApplied", function (event) {
    pbiLogEvent("Event - bookmarkApplied:\n", event.detail);
});

// Select Run and then go to bookmarks
// and select 'Apply Bookmark by name'.
// You should see an entry in the Log window.
pbiLog("Apply a bookmark to see events in Log window.");
}

function _Events_ReportLoaded() {
// report.off removes all event handlers for a specific event
report.off("loaded");

// report.on will add an event handler which prints to Log window.
report.on("loaded", function () {
    pbiLogEvent("Loaded");
});

pbiLog("Reload the report to see the loaded event.");
}

function _Events_ReportVisualLoaded() {
// visual.off removes all event handlers for a specific event
visual.off("loaded");

// visual.on will add an event handler which prints to Log window.
visual.on("loaded", function () {
    pbiLogEvent("Loaded");
});

pbiLog("Reload the visual to see the loaded event.");
}

function _Events_ReportRendered() {
// report.off removes all event handlers for a specific event
report.off("rendered");

// report.on will add an event handler which prints to Log window.
report.on("rendered", function () {
    pbiLogEvent("Rendered");
});

pbiLog("Reload the report to see the rendered event.");
}

function _Events_ReportVisualRendered() {
// visual.off removes all event handlers for a specific event
visual.off("rendered");

// visual.on will add an event handler which prints to Log window.
visual.on("rendered", function () {
    pbiLogEvent("Rendered");
});

pbiLog("Reload the visual to see the rendered event.");
}

function _Events_ReportSaved() {
// report.off removes all event handlers for a specific event
report.off("saved");

// report.on will add an event handler which prints to Log window.
report.on("saved", function (event) {
    if (event.detail.saveAs) {
        pbiLogEvent(event.detail, '\nIn order to interact with the new report, create a new token and load the new report');
    }
    else {
        pbiLogEvent(event.detail);
    }
});

pbiLog("Save/SaveAs the report to see the saved event.");
}

function _Events_TileLoaded() {
// tile.off removes all event handlers for a specific event
tile.off("tileLoaded");

// tile.on will add an event handler which prints to Log window.
tile.on("tileLoaded", function (event) {
    pbiLogEvent("Tile loaded event");
});

pbiLog("Reload the tile to see the loaded event.");
}

function _Events_TileClicked() {
// tile.off removes all event handlers for a specific event
tile.off("tileClicked");

// tile.on will add an event handler which prints to Log window.
tile.on("tileClicked", function (event) {
    pbiLogEvent("Tile clicked event\n", event.detail);
});

pbiLog("Click on the tile to see the tile clicked event.");
}

function _Events_ButtonClicked() {
// report.off removes all event handlers for a specific event
report.off("buttonClicked");

// report.on will add an event listener.
report.on("buttonClicked", function (event) {
    let data = event.detail;
    pbiLogEvent("Event - buttonClicked:\n", data);
});

// Select Run and click on a button in the report
// For example, a Qna button. You should see an entry in the Log window.
pbiLog("Click button to see event in Log window.");
}

// ---- Dashboard Operations ----------------------------------------------------

function _Dashboard_GetId() {
// Retrieve the dashboard id.
let dashboardId = dashboard.getId();

pbiLog("Dashboard id: \"" + dashboardId + "\"");
}

function _Dashboard_FullScreen() {
// Displays the dashboard in full screen mode.
dashboard.fullscreen();
}

function _Dashboard_ExitFullScreen() {
// Exits full screen mode.
dashboard.exitFullscreen();
}

async function _Dashboard_Reload() {
// Reload the displayed dashboard
try {
    await dashboard.reload();
}
catch (errors) {
    pbiLog(errors);
}
}

// ---- Dashboard Events Listener ----------------------------------------------------

function _DashboardEvents_TileClicked() {
// dashboard.off removes all event handlers for a specific event
dashboard.off("tileClicked");

// dashboard.on will add an event listener.
dashboard.on("tileClicked", function (event) {
    pbiLogEvent(event.detail);
});
}

// ---- Qna Events Listener ----------------------------------------------------

async function _Qna_SetQuestion() {
try {
    const result = await qna.setQuestion(/*>>>*/"2014 total units YTD by manufacturer, region as treemap chart"/*<<<*/);
    pbiLog(result);
}
catch (errors) {
    pbiLog(errors);
}
}

function _Qna_QuestionChanged() {
// qna.off removes all event handlers for a specific event
qna.off("visualRendered");

// qna.on will add an event listener.
qna.on("visualRendered", function (event) {
    pbiLogEvent(event.detail);
});

pbiLog("Change the question to see events in Log window.");
}

// ---- Visual Events Listener ----------------------------------------------------

function _Visual_DataSelected() {
// visual.off removes all event handlers for a specific event
visual.off("dataSelected");

// visual.on will add an event listener.
visual.on("dataSelected", function (event) {
    let data = event.detail;
    pbiLogEvent("Event - dataSelected:\n", data);
});

// Select Run and select an element of a visualization.
// For example, a bar in a bar chart. You should see an entry in the Log window.

pbiLog("Select data to see events in Log window.");
}

// ---- Bookmarks Operations ----------------------------------------------------
async function _Bookmarks_Enable() {
// The new settings that you want to apply to the report.
const newSettings = {
    panes: {
        bookmarks: {
            visible: true
        }
    }
};

// Update the settings by passing in the new settings you have configured.
try {
    await report.updateSettings(newSettings);
}
catch (error) {
    pbiLog(error);
}
}

async function _Bookmarks_Disable() {
// The new settings that you want to apply to the report.
const newSettings = {
    panes: {
        bookmarks: {
            visible: false
        }
    }
};

// Update the settings by passing in the new settings you have configured.
try {
    await report.updateSettings(newSettings);
}
catch (error) {
    pbiLog(error);
}
}

async function _Bookmarks_Get() {
// Retrieve the bookmark collection and loop through to print the
// bookmarks' name and display name.
try {
    const bookmarks = await report.bookmarksManager.getBookmarks();
    bookmarks.forEach(function (bookmark) {
        let log = bookmark.name + " - " + bookmark.displayName;
        pbiLog(log);
    });
}
catch (error) {
    pbiLog(error);
}
}

async function _Bookmarks_Apply() {
// bookmarksManager.apply will apply the bookmark with the
// given name on the report.
// This is the actual bookmark name not the display name.
try {
    await report.bookmarksManager.apply(/*>>>*/"Bookmarkaf5fe203dc1e280a4822"/*<<<*/);
    pbiLog("Bookmark \"Q4 2014\" applied.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Bookmarks_CaptureState() {
// Capture the current bookmark and prints the bookmark's
// state string to Log window.
try {
    const capturedBookmark = await report.bookmarksManager.capture();
    let log = "Captured bookmark state: " + capturedBookmark.state;
    pbiLog(log);
}
catch (error) {
    pbiLog(error);
}
}

async function _Bookmarks_ApplyState() {
// bookmarksManager.applyState will apply the bookmark which
// represented by the given state string.
try {
    await report.bookmarksManager.applyState(/*>>>*/"H4sIAAAAAAAAA+1d62/bOBL/VwIfDvmSXQyfEvvp2qa9La7Z7iW9HIpDP/AxcrRrS4Yspw2K/u9HSbbrxJal+J3USRBEMjUcDofD3zyofOu4eDjo6bvfdR87Lzqv0vSvvs7+OiGkc9ZJ7t8MlNbaEMuIoxGllFMS+VbpII/TZNh58a2T66yL+XU8HOleQdHf/F8HeEggcIZKwQyRwoEQnc/fzzr4ddBLM108fZXrHAsKt5gN/bXvlfwKnri2eXyLV2jz6u4lDtIsH19LAOcUVcwFRDsEEkjhn4niXu7JFOTM3Zuvg8xz8W0ymLflh75Vfjcorl/7jrtpFlvdmz5aPHk9YYSedd5mab+kMZaS8y3fJHmc3/mL84Lz75/POv+9wQzLZq/TxMUVw98678rfBRs4HFaCKpv0Rv0HnxRXV+kos3iJ0Y+LssPvXl5/ZOkAs7LTT6gzf8/3eq17o1LOnuj72DPvx1GwX9z2DSkQ/r5o+fm7/1UJfaa7Vmw8GOpCTs46N+mX1xn6Fq7zgpRdDatZKieied58ozUmbp1h+dG4kc0fjuwKu31M8gWDO3vAFNkGV4uEfZEm+U0LhugOxRQPr3XyMhs67NXowW1pD/yiyHWcjOdXRCQALYghKL0iEGeZKu4P46Tbw8qClPag/OtjNRajh7G9utH+wpsd86fXpoLY96JbVCIMGBNADRBpCSLCWgSp1NxbPIYBD3jIIMRgPYJhGEobSaCWc0IF1Ua7RoI5fs1N+nWemoCA+G9NRejXuCICDFmLvQBQCEIjFxolDA3ACb06e1QoFkZgNIAXoSUMmFmLPW8wmHCRlx+nEoQRwjYrTC17VitqGHcuJBqscIrz5snVpfF6Ncpzv0zmp5c5wyURwmgBjBmtgK9JUkZGBwJsgDSQzijCrF2D5Nlksy+e6aeuaH0TO4dJp1pClHk5MAcSqQ4DqwSDerO8q/3zQ0nuPUZ5ZbL6A53Fw4kBm1z9K078YoKzmYZrbbCXoyTxUj6Zbm+XcfemJLxgkyXFDnuv0UGySSs2twQE5liZ26IOYUeCGUZeuludWHRzXFygHo4ybMvGle7h8K2eZ+RjmuveyX+S2K+/eUZKiLRsJdveaOgnEV0lldc3Ossfrug0c5i9uiuXzXmcTXCyX3RvdjCkYtkutylGUCRWWxOC9bYROZAVd5WmnkJghHoYEXCp0ITInW426Sv1RKmjjCERBJwJnHeINN+/ndyKn/FgUTf7G2SrzkZrG7P1pf33ag2cXHi/GPMTD1oy3K+xWcTRySWhF6uYHqOzgzA3NWJutjshCwWTEeEOVUiMsVywNdEYRetBMTM2pAyFx2MhROs5BA6874uBDiVYiiIAuYZDoELBheSRjDRHMNa7VM2Iu5aaA6o1eHdAIkAowyCiwerUru97gGT/1vKIKo+o8lmiyhaM/Bb7Oczszd17vMXePD/Tz+c/mrBx7RWvCtyOleiRMzxeslMynXsjnDab4aS8efLjRvHxmP/FMUhoqRzPThqLg4Q/p2ac67tteV5VZsLz9udMmHusaBVAenbSnKyzZzi0yaL53Oj9PcAybP9Y5uj5Haqf9SQd0me3to/wYFYa/x75zQyPAjnipc3hpZ7fCY8g6bFIAkISomUoEIAhaENlc2x89fSe0pQLIFZZKqWTwMMWIZ3lIbFIGxABUwGC4iEn1pF1SDaNwCkeKAdaoUXtQPBxgnLlCBy3Aoo8AUehADToQOJaBKVENJ4mOi/gACjTMlyLIPPKYbmIDAFDVUFa0UaCtXE4RgUGTAMBisY4Io2w9fi1XY1LO0AbzwLadx68Wp2nvsctw9p4rqgn1/lo2ArQnl6gi0f9003B2tlR1zDVVNfzYw5mtqR2EzCcnYAZFFkv/9bRxnYQdjonc8P/x1QyQJvDjeedmmDjppD0HDvbDznWq8a7vu4uwvGNW3J/1MvjS/+MztyCXIaxQWikJAGzTFlumMajIagzBO/TL0crcFBWgBytwAasAHdFtZrWwsMVh9y6SDXjqWEvtqUO/iDW6WPWLUXexaSaKq9Gg4r/GIc/LMv9vzYWAXuZlInTduk8urE82dQ1WKaqzjfK4z6eFqXYv4D8BchHgBflz+njMnxsn5wTMs95uQLH6Xid6wXTPsy9V3g+Lu7HckNZTUp+aSXu0YQI/MLIR+qpyBdc/aooGxOrvIullE5fYf4FMTmdmJr6+gfysP5h/YDn+F7VbeRoRDiw4scGRmhlw/rtenchx4knf1JoKnqXuC7suIah2kfRSe24qumg3llkwmnLnHKa01DoJYWyP9feTRrNCtvl3k1a4KmfENH+5udnz5D26cOnB5nAA6gBPcgCoXEd0yGVB7UT/WBW9NOqoHrp76SmbDC3xmaOqS2bhlPP6y0mMfpN55G4cw/MXnh8Vh0NnUGaOz3mV5MA2tZe/Xuazw9kZxt4VVM2hT3XhWCbHYRk1OvVz85m690W8bZK+nIjOjPNYO2Vi9nbe6s7WIq1dsrJ364G2uKCaE0rLl5mcX7T966jnTXim9XhaQHpTPXmdH1dWd/avbnVC5Kg22ej7N1bpdK/+TAobG/qrRw7hBnds14tjQS2AJGD+DbNP2rTw307tnWWtNiWFmbqPfR9hGvS3l59LtEHEcoYQqzz/rQAIsAJWY+hj270HhNhRzf6cDPET9+RDnkUSB4CJ1oHoYaiQqEgsXoeoiYa3Sbqe+6fcOmXmbDvAl9/iZ1a1S4dHf1N1/8+T1etKvS9X3786cOnk9c3Ouk2+2xwvn2PrQWL27di/8R0TomwWzyyVzT5eG/2kPI4T8qxfHalpWsVsm/r7VM77n+1N2msc4xrg2bnGevkRie48g85SCskDRhHamUIDPEgst6P2tyeXO67YXRVBjwIlaFUO+4E0wY4Z7Ak/fWzu4kHkG39uaInzQWEOy1CeLYFhIpFBGkoDePGUUIoZc3nP3bruEMEDFQUKAJcaYWasGOi/mn479vcvxsPyj7BXXvBa5IWhK6Co/b/xNrfNvzwpNS/Pq9VNJTFm/pMcbSPSMuUUs661d2Il91uhl09UeV1yn6XILk0qwb5dpSMhQe78bsfjS538DK5PYq80iChNNcq4NSYgJPQGS2bX4x71KCjBk01iBlwkikRAsiQUsXAHSvGW6e6d3ra65jqPtAzkE/fXV74n1DWcpc3d96uO6uTZRB7u8rYrY2St1DGN3qYz2jj0hNorU56FW9gmI0blF//B2OhSYYdZwAA"/*<<<*/);
    pbiLog("Bookmark applied from given state.");
}
catch (error) {
    pbiLog(error);
}
}

async function _Bookmarks_EnterPresentation() {
// Enter bookmarks play mode
try {
    await report.bookmarksManager.play(models.BookmarksPlayMode.Presentation);
    pbiLog("Bookmarks play mode is on, check the play bar at the bottom of the report.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Bookmarks_ExitPresentation() {
// Exit bookmarks play mode
try {
    await report.bookmarksManager.play(models.BookmarksPlayMode.Off);
    pbiLog("Bookmarks play mode is off.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Visual_GetSlicerState() {
// Retrieve the page collection and get the visuals for the active page.
try {
    const pages = await report.getPages();

    // Retrieve the active page.
    let pageWithSlicer = pages.filter(function (page) {
        return /*>>>*/page.isActive/*<<<*/;
    })[0];

    const visuals = await pageWithSlicer.getVisuals();

    // Retrieve the target visual.
    let slicer = visuals.filter(function (visual) {
        return visual.type === "slicer" && visual.name === /*>>>*/"4d55baaa5eddde4cdf90"/*<<<*/;
    })[0];

    // Get the slicer state
    const state = await slicer.getSlicerState();
    pbiLog(state);
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Visual_SetSlicer() {
// Create the filter object. For more information see https://go.microsoft.com/fwlink/?linkid=2153364
const filter = {
    $schema: "http://powerbi.com/product/schema#advanced",
    target: {
        table: /*>>>*/"Date"/*<<<*/,
        column: /*>>>*/"Date"/*<<<*/
    },
    filterType: models.FilterType.Advanced,
    logicalOperator: /*>>>*/"And"/*<<<*/,
    conditions: [
        {
            operator: /*>>>*/"GreaterThanOrEqual"/*<<<*/,
            value: /*>>>*/"2014-10-12T21:00:00.000Z"/*<<<*/
        },
        {
            operator: /*>>>*/"LessThan"/*<<<*/,
            value: /*>>>*/"2014-11-28T22:00:00.000Z"/*<<<*/
        }
    ]
};

// Retrieve the page collection and get the visuals for the active page.
try {
    const pages = await report.getPages();

    // Retrieve the active page.
    let page = pages.filter(function (page) {
        return /*>>>*/page.isActive/*<<<*/;
    })[0];

    const visuals = await page.getVisuals();

    // Retrieve the target visual.
    let slicer = visuals.filter(function (visual) {
        return visual.type === "slicer" && visual.name === /*>>>*/"4d55baaa5eddde4cdf90"/*<<<*/;
    })[0];

    // Set the slicer state which contains the slicer filters.
    await slicer.setSlicerState({ filters: [filter] });
    pbiLog("Date slicer was set.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Visual_AddFilters() {
// Create the filter object. For more information see https://go.microsoft.com/fwlink/?linkid=2153364
const filter = {
    $schema: "http://powerbi.com/product/schema#advanced",
    target: {
        table: /*>>>*/"SalesFact"/*<<<*/,
        measure: /*>>>*/"Total Category Volume"/*<<<*/
    },
    filterType: models.FilterType.Advanced,
    logicalOperator: /*>>>*/"And"/*<<<*/,
    conditions: [
        {
            operator: /*>>>*/"LessThan"/*<<<*/,
            value: /*>>>*/1000/*<<<*/
        }
    ]
};

// Retrieve the page collection and get the visuals for the active page.
try {
    const pages = await report.getPages();

    // Retrieve the active page.
    let page = pages.filter(function (page) {
        return /*>>>*/page.isActive/*<<<*/
    })[0];

    const visuals = await page.getVisuals();

    // Retrieve the target visual.
    let visual = visuals.filter(function (visual) {
        return visual.name === /*>>>*/"VisualContainer4"/*<<<*/;
    })[0];

    // Add the filter to the visual's filters.
    await visual.updateFilters(models.FiltersOperations.Add, [filter]);
    pbiLog("Filter was added for \"Category Breakdown\" table.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Visual_ReplaceAllFilters() {
// Create the filter object. For more information see https://go.microsoft.com/fwlink/?linkid=2153364
const filter = {
    $schema: "http://powerbi.com/product/schema#advanced",
    target: {
        table: /*>>>*/"SalesFact"/*<<<*/,
        measure: /*>>>*/"Total Category Volume"/*<<<*/
    },
    filterType: models.FilterType.Advanced,
    logicalOperator: /*>>>*/"And"/*<<<*/,
    conditions: [
        {
            operator: /*>>>*/"LessThan"/*<<<*/,
            value: /*>>>*/500/*<<<*/
        }
    ]
};

// Retrieve the page collection and get the visuals for the active page.
try {
    const pages = await report.getPages();

    // Retrieve the active page.
    let page = pages.filter(function (page) {
        return /*>>>*/page.isActive/*<<<*/
    })[0];

    const visuals = await page.getVisuals();

    // Retrieve the target visual.
    let visual = visuals.filter(function (visual) {
        return visual.name === /*>>>*/"VisualContainer4"/*<<<*/;
    })[0];

    // Replace all visual's filters.
    await visual.updateFilters(models.FiltersOperations.ReplaceAll, [filter]);
    pbiLog("All the filters were replaced for \"Category Breakdown\" table.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Visual_ReplaceFilters() {
// Create the filter object. For more information see https://go.microsoft.com/fwlink/?linkid=2153364
const filter = {
    $schema: "http://powerbi.com/product/schema#advanced",
    target: {
        table: /*>>>*/"SalesFact"/*<<<*/,
        measure: /*>>>*/"Total Category Volume"/*<<<*/
    },
    filterType: models.FilterType.Advanced,
    logicalOperator: /*>>>*/"And"/*<<<*/,
    conditions: [
        {
            operator: /*>>>*/"GreaterThan"/*<<<*/,
            value: /*>>>*/500/*<<<*/
        }
    ]
};

// Retrieve the page collection and get the visuals for the active page.
try {
    const pages = await report.getPages();

    // Retrieve the active page.
    let page = pages.filter(function (page) {
        return /*>>>*/page.isActive/*<<<*/
    })[0];

    const visuals = await page.getVisuals();

    // Retrieve the target visual.
    let visual = visuals.filter(function (visual) {
        return visual.name === /*>>>*/"VisualContainer4"/*<<<*/;
    })[0];

    // Replace visual's filters with the same target data field.
    await visual.updateFilters(models.FiltersOperations.Replace, [filter]);
    pbiLog("Filters were replaced for \"Category Breakdown\" table.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Visual_GetFilters() {
// Retrieve the page collection and get the visuals for the active page.
try {
    const pages = await report.getPages();

    // Retrieve the active page.
    let page = pages.filter(function (page) {
        return /*>>>*/page.isActive/*<<<*/
    })[0];

    const visuals = await page.getVisuals();

    // Retrieve the target visual.
    let visual = visuals.filter(function (visual) {
        return visual.name === /*>>>*/"VisualContainer4"/*<<<*/;
    })[0];

    const filters = await visual.getFilters();
    pbiLog(filters);
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Visual_RemoveFilters() {
// Retrieve the page collection and get the visuals for the active page.
try {
    const pages = await report.getPages();

    // Retrieve the active page.
    let page = pages.filter(function (page) {
        return /*>>>*/page.isActive/*<<<*/
    })[0];

    const visuals = await page.getVisuals();

    // Retrieve the target visual.
    let visual = visuals.filter(function (visual) {
        return visual.name === /*>>>*/"VisualContainer4"/*<<<*/;
    })[0];

    await visual.updateFilters(models.FiltersOperations.RemoveAll);
    pbiLog("\"Sentiment by Year and Months\" visual filters were removed.");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Visual_ExportData_Summarized() {
// Retrieve the page collection and get the visuals for the active page.
try {
    const pages = await report.getPages();

    // Retrieve the page that contain the visual. For the sample report it will be the active page
    let page = pages.filter(function (page) {
        return /*>>>*/page.isActive/*<<<*/
    })[0];

    const visuals = await page.getVisuals();

    // Retrieve the target visual.
    let visual = visuals.filter(function (visual) {
        return visual.name === /*>>>*/"VisualContainer4"/*<<<*/;
    })[0];

    const result = await visual.exportData(models.ExportDataType.Summarized);
    pbiLog(result.data);
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Visual_ExportData_Underlying() {
// Retrieve the page collection and get the visuals for the active page.
try {
    const pages = await report.getPages();

    // Retrieve the page that contain the visual. For the sample report it will be the active page
    let page = pages.filter(function (page) {
        return /*>>>*/page.isActive/*<<<*/
    })[0];

    const visuals = await page.getVisuals();

    // Retrieve the target visual.
    let visual = visuals.filter(function (visual) {
        return visual.name === /*>>>*/"VisualContainer4"/*<<<*/;
    })[0];

    // Exports visual data
    const result = await visual.exportData(models.ExportDataType.Underlying);
    pbiLog(result.data);
}
catch (errors) {
    pbiLog(errors);
}
}

async function _ReportVisual_UpdateSettings() {
// The new settings that you want to apply to the report.
const newSettings = {
    panes: {
        filters: {
            visible: true
        }
    }
};

// Update the settings by passing in the new settings you have configured.
try {
    await visual.updateSettings(newSettings);
    pbiLog("Filter pane was added.");
}
catch (error) {
    pbiLog(error);
}
}

async function _ReportVisual_HideSingleVisualHeader() {
// Define settings to hide the header of a single visual
let newSettings = {
    visualSettings: {
        visualHeaders: [
            {
                settings: {
                    visible: true
                }
                // No selector - Show visual header for all the visuals in the report
            },
            {
                settings: {
                    visible: false
                },
                selector: {
                    $schema: "http://powerbi.com/product/schema#visualSelector",
                    visualName: /*>>>*/"47eb6c0240defd498d4b"/*<<<*/
                    // The visual name can be retrieved using getVisuals()
                    // Hide visual header for a single visual only
                }
            }
        ]
    }
};

// Update the settings by passing in the new settings you have configured.
try {
    await visual.updateSettings(newSettings);
    pbiLog("Visual header was successfully hidden for 'Sentiment by Year and Months' visual.");
}
catch (error) {
    pbiLog(error);
}
}

async function _Report_Authoring_Create() {
if (!authoringPage) {
    pbiLog("Authoring page is undefined. Please run 'Create an authoring page' first.");
} else {
    // Creating new visual
    // For more information about report authoring, see https://go.microsoft.com/fwlink/?linkid=2153366
    try {
        await authoringPage.setActive();
        const response = await authoringPage.createVisual('clusteredColumnChart');
        window.lastCreatedVisual = response.visual;

        // Defining data fields
        const regionColumn = { column: /*>>>*/'Region'/*<<<*/, table: /*>>>*/'Geo'/*<<<*/, schema: 'http://powerbi.com/product/schema#column' };
        const totalUnitsMeasure = { measure: /*>>>*/'Total Units'/*<<<*/, table: /*>>>*/'SalesFact'/*<<<*/, schema: 'http://powerbi.com/product/schema#measure' };
        const totalVanArsdelUnitsMeasure = { measure: /*>>>*/'Total VanArsdel Units'/*<<<*/, table: /*>>>*/'SalesFact'/*<<<*/, schema: 'http://powerbi.com/product/schema#measure' };

        // Adding visual data fields
        lastCreatedVisual.addDataField('Category', regionColumn);
        lastCreatedVisual.addDataField('Y', totalUnitsMeasure);
        lastCreatedVisual.addDataField('Y', totalVanArsdelUnitsMeasure);
    }
    catch (errors) {
        pbiLog(errors);
    }
}
}

async function _Report_Authoring_CreatePage() {
try {
    const pageName = "Authoring page";
    if (authoringPage) {
        pbiLog(pageName + " already exists.")
        await authoringPage.setActive();
        return;
    }

    // Adds a new page for the authoring APIs
    window.authoringPage = await report.addPage(pageName);
    pbiLog("A new page for the authoring APIs was created, next step would be to use the 'Create a visual' API");
} catch (errors) {
    pbiLog(errors);
}
}

async function _Report_Authoring_DeletePage() {
if (!authoringPage) {
    pbiLog("Authoring page is undefined. Please run 'Create an authoring page' first.");
} else {
    try {
        // Get required page name.
        const pageName = authoringPage.name;

        // Delete the page.
        await report.deletePage(pageName);
        pbiLog("Existing authoring page with name \"" + pageName + "\" has been deleted.");
        authoringPage = undefined;

        const pages = await report.getPages();

        // Get the visible pages in view mode.
        const visiblePages = pages.filter((page) => page.visibility == 0);

        if (visiblePages.length > 0) {
            await visiblePages[0].setActive();
        }
    }
    catch (errors) {
        pbiLog(errors);
    }
}
}

async function _Report_Authoring_RenamePage() {
if (!authoringPage) {
    pbiLog("Authoring page is undefined. Please run 'Create an authoring page' first.");
} else {
    try {
        // Get required page name.
        const oldDisplayName = authoringPage.displayName;
        const newDisplayName = /*>>>*/"New page name"/*<<<*/;

        // Rename the page.
        await authoringPage.setDisplayName(newDisplayName);
        pbiLog("Page name was updated to \"" + newDisplayName + "\" from \"" + oldDisplayName + "\".");
    }
    catch (errors) {
        pbiLog(errors);
    }
}
}

async function _Report_Authoring_ChangeType() {
if (!authoringPage || !lastCreatedVisual) {
    pbiLog("Make sure you created a visual on the authoring page. Please run 'Create a visual'");
} else {
    try {
        await authoringPage.setActive();
        await lastCreatedVisual.changeType('waterfallChart');

        // When caching the visual object, you need to manually update the visual type
        lastCreatedVisual.type = 'waterfallChart';
    }
    catch (errors) {
        pbiLog(errors);
    }
}
}

async function _Report_Authoring_Remove() {
if (!authoringPage || !lastCreatedVisual) {
    pbiLog("Make sure you created a visual on the authoring page. Please run 'Create a visual'");
} else {
    try {
        await authoringPage.setActive();
        await authoringPage.deleteVisual(lastCreatedVisual.name);

        // Check if there are previously created visuals and set 'lastCreatedVisual' if any were found
        const visuals = await authoringPage.getVisuals();

        if (visuals.length  > 0) {
            lastCreatedVisual = visuals[visuals.length - 1];
        } else {
            lastCreatedVisual = undefined;
        }
    }
    catch (errors) {
        pbiLog(errors);
    }
}
}

async function _Report_Authoring_Capabilities() {
if (!authoringPage || !lastCreatedVisual) {
    pbiLog("Make sure you created a visual on the authoring page. Please run 'Create a visual'");
} else {
    try {
        await authoringPage.setActive();
        const capabilities = await lastCreatedVisual.getCapabilities();
        pbiLog("Visual capabilities:\n", capabilities);
    }
    catch (errors) {
        pbiLog(errors);
    }
}
}

async function _Report_Authoring_AddDataField() {
if (!authoringPage || !lastCreatedVisual) {
    pbiLog("Make sure you created a visual on the authoring page. Please run 'Create a visual'");
} else {
    try {
        await authoringPage.setActive();
        // Getting 'Y' role data fields
        // For more information about building data fields, see https://go.microsoft.com/fwlink/?linkid=2153697
        const dataFields = await lastCreatedVisual.getDataFields('Y');

        // Removing the second data field of 'Y' role, in order to add Legend/Breakdown
        if (dataFields.length > 1)
            lastCreatedVisual.removeDataField('Y', 1);

        // Adding Legend/Breakdown data role
        if (lastCreatedVisual.type === 'clusteredColumnChart') {
            const quarterColumn = { column: /*>>>*/'Quarter'/*<<<*/, table: /*>>>*/'Date'/*<<<*/, schema: 'http://powerbi.com/product/schema#column' };
            await lastCreatedVisual.addDataField('Series', quarterColumn);
        } else {
            const categoryColumn = { column: /*>>>*/'Category'/*<<<*/, table: /*>>>*/'Product'/*<<<*/, schema: 'http://powerbi.com/product/schema#column' };
            await lastCreatedVisual.addDataField('Breakdown', categoryColumn);
        }
    }
    catch (errors) {
        pbiLog(errors);
    }
}
}

async function _Report_Authoring_RemoveDataField() {
if (!authoringPage || !lastCreatedVisual) {
    pbiLog("Make sure you created a visual on the authoring page. Please run 'Create a visual'");
} else {
    try {
        await authoringPage.setActive();
        let dataRole = lastCreatedVisual.type === 'clusteredColumnChart' ? 'Series' : 'Breakdown';

        const dataFields = await lastCreatedVisual.getDataFields(dataRole);

        if (dataFields.length > 0) {
            await lastCreatedVisual.removeDataField(dataRole, dataFields.length - 1);
        }
        else {
            pbiLog("The visual doesn't have a data field to remove.");
        }
    }
    catch (errors) {
        pbiLog(errors);
    }
}
}

async function _Report_Authoring_GetDataField() {
if (!authoringPage || !lastCreatedVisual) {
    pbiLog("Make sure you created a visual on the authoring page. Please run 'Create a visual'");
} else {
    try {
        await authoringPage.setActive();
        const dataFields = await lastCreatedVisual.getDataFields('Y');
        pbiLog("Visual 'Y' fields:\n", dataFields);
    }
    catch (errors) {
        pbiLog(errors);
    }
}
}

async function _Report_Authoring_GetProperty() {
if (!authoringPage || !lastCreatedVisual) {
    pbiLog("Make sure you created a visual on the authoring page. Please run 'Create a visual'");
} else {
    try {
        await authoringPage.setActive();
        const property = await lastCreatedVisual.getProperty({ objectName: /*>>>*/"legend"/*<<<*/, propertyName: /*>>>*/"position"/*<<<*/ });
        pbiLog("Last visual - legend position property:\n", property);
    }
    catch (errors) {
        pbiLog(errors);
    }
}
}

async function _Report_Authoring_SetProperty() {
if (!authoringPage || !lastCreatedVisual) {
    pbiLog("Make sure you created a visual on the authoring page. Please run 'Create a visual'");
} else {
    try {
        await authoringPage.setActive();
        await lastCreatedVisual.setProperty({ objectName: /*>>>*/"title"/*<<<*/, propertyName: /*>>>*/"textSize"/*<<<*/ }, { schema: 'http://powerbi.com/product/schema#property', value: /*>>>*/8/*<<<*/ });
        await lastCreatedVisual.setProperty({ objectName: /*>>>*/"title"/*<<<*/, propertyName: /*>>>*/"fontColor"/*<<<*/ }, { schema: 'http://powerbi.com/product/schema#property', value: /*>>>*/'#000000'/*<<<*/ });
        await lastCreatedVisual.setProperty({ objectName: /*>>>*/"legend"/*<<<*/, propertyName: /*>>>*/"position"/*<<<*/ }, { schema: 'http://powerbi.com/product/schema#property', value: 'BottomCenter' });
    }
    catch (errors) {
        pbiLog(errors);
    }
}
}

async function _Report_Authoring_ResetProperty() {
if (!authoringPage || !lastCreatedVisual) {
    pbiLog("Make sure you created a visual on the authoring page. Please run 'Create a visual'");
} else {
    try {
        await authoringPage.setActive();
        await lastCreatedVisual.resetProperty({ objectName: /*>>>*/"legend"/*<<<*/, propertyName: /*>>>*/"position"/*<<<*/ });
    }
    catch (errors) {
        pbiLog(errors);
    }
}
}

async function _Report_Authoring_SetVisualDisplayName() {
if (!authoringPage || !lastCreatedVisual) {
    pbiLog("Make sure you created a visual on the authoring page. Please run 'Create a visual'");
} else {
    try {
        const oldDisplayName = await lastCreatedVisual.getDataFieldDisplayName('Y', 0);
        const newDisplayName = /*>>>*/"Total Units All"/*<<<*/;
        await authoringPage.setActive();
        await lastCreatedVisual.setDataFieldDisplayName('Y', 0, newDisplayName);
        pbiLog("Visual data field display name was updated to \"" + newDisplayName + "\" from \"" + oldDisplayName + "\".");
    }
    catch (errors) {
        pbiLog(errors);
    }
}
}

async function _Report_Accessibility_GetZoom() {
try {
    // Retrieve the zoom level.
    const currentZoom = await report.getZoom();
    pbiLog("Zoom level: \"" + currentZoom + "\"");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Report_Accessibility_SetZoom() {
// Retrieve the report zoom level, and then set it to the new level specified.
try {
    const currentZoom = await report.getZoom();
    const newZoom = /*>>>*/0.5/*<<<*/; // 50% zoom
    await report.setZoom(newZoom);
    pbiLog("Zoom level was set to: \"" + newZoom + "\" from \"" + currentZoom + "\"");
}
catch (errors) {
    pbiLog(errors);
}
}

async function _Report_Accessibility_SetComponentTitle() {
try {
    const title = /*>>>*/"Embedded report"/*<<<*/;
    await report.setComponentTitle(title);
    pbiLog("The <iframe> title was set to \"" + title + "\"");
}
catch (errors) {
    pbiLog(errors);
}
}