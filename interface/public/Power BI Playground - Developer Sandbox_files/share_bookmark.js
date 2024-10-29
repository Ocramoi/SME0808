var EMBED_ACCESS_TOKEN;
var EMBED_URL;
var REPORT_ID;

////////////////////// Important //////////////////////
// When changing this file, bump the file version in //
//    src\Clients\PowerBIPlayground\index.cshtml     //
///////////////////////////////////////////////////////

// Embed shared report with bookmark on load
function embedSharedBookmark() {

  let overlay = $("#overlay");
  let shareBookmark = $("#share-bookmark");

  // Get models. models contains enums that can be used
  const models = window["powerbi-client"].models;

  // Use View permissions
  let permissions = models.Permissions.View;

  // Get the bookmark name from url param
  let bookmarkName = getBookmarkNameFromURL();

  // Get the bookmark state from local storage
  // any type of database can be used
  let bookmarkState = localStorage.getItem(bookmarkName);

  // Embed configuration used to describe the what and how to embed
  // This object is used when calling powerbi.embed
  // This also includes settings and options such as filters
  // You can find more information at https://docs.microsoft.com/en-us/javascript/api/overview/powerbi/configure-report-settings
  let config = {
    type: "report",
    tokenType: models.TokenType.Embed,
    accessToken: EMBED_ACCESS_TOKEN,
    embedUrl: EMBED_URL,
    id: REPORT_ID,
    permissions: permissions,
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
    layoutType: models.LayoutType.Custom,
    customLayout: {
      displayOption: models.DisplayOption.FitToWidth
    }
  };

  if (bookmarkState) {
    config = {
      ...config,
      // Adding bookmark attribute will apply the bookmark on load
      bookmark: {
        state: bookmarkState
      }
    }
  } else {
    window.alert("The bookmark wasn't found in the cache. Did you open the link in a different browser?\nRendering without the bookmark.");
  }

  // Embed the report and display it within the div container
  let bookmarkContainer = $("#bookmark-container").get(0);
  let report = powerbi.embed(bookmarkContainer, config);

  report.on("loaded", function () {

    // Hide the loader and display the report
    overlay.css("visibility", "hidden");
    shareBookmark.css("visibility", "visible");

    report.off("loaded");
  });
}

// Get the bookmark name from url "id" argument
function getBookmarkNameFromURL() {
  let url = (window.location != window.parent.location) ? document.referrer : document.location.href;

  const regex = new RegExp("[?&]id(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);

  // It can take id parameter from the URL using ? or &
  // If ? or & is not in the URL, returns NULL
  if (!results) { return null };

  // Returns Empty String if id parameter's value is not specified
  if (!results[2]) { return "" };

  // Returns the ID of the Bookmark
  return decodeURIComponent(results[2]);
}