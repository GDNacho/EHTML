'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('./../cutie/exports'),
    as = _require.as;

var _require2 = require('./../async-string/exports'),
    StringFromBuffer = _require2.StringFromBuffer;

var _require3 = require('./../async-ajax/exports'),
    ResponseFromAjaxRequest = _require3.ResponseFromAjaxRequest,
    ResponseBody = _require3.ResponseBody;

var _require4 = require('./../async-object/exports'),
    CreatedOptions = _require4.CreatedOptions;

var _require5 = require('./../async-dom/exports'),
    ReplacedElementWithAnotherOne = _require5.ReplacedElementWithAnotherOne,
    ExtractedDocument = _require5.ExtractedDocument,
    BodyOfDocument = _require5.BodyOfDocument,
    TitleOfDocument = _require5.TitleOfDocument,
    FaviconOfDocument = _require5.FaviconOfDocument,
    ChangedPageTitle = _require5.ChangedPageTitle,
    ChangedPageFavicon = _require5.ChangedPageFavicon;

var _require6 = require('./../async-history/exports'),
    PushedStartStateToHistoryIfNeeded = _require6.PushedStartStateToHistoryIfNeeded,
    PushedStateToHistory = _require6.PushedStateToHistory,
    UpdatedStateInHistory = _require6.UpdatedStateInHistory;

var TurboRedirected = function TurboRedirected(href, headers, _ref) {
  var progressBarPlace = _ref.progressBarPlace,
      progressBarClassName = _ref.progressBarClassName,
      ajaxFavicon = _ref.ajaxFavicon;

  _classCallCheck(this, TurboRedirected);

  var progressBar;
  return new PushedStartStateToHistoryIfNeeded(new CreatedOptions('url', location.href, 'headers', headers, 'scrollY', window.pageYOffset || document.documentElement.scrollTop, 'documentElementClientHeight', document.documentElement.clientHeight, 'documentBodyClientHeight', document.body.clientHeight), location.href).after(new ChangedPageFavicon(document, ajaxFavicon, true).after(new ExtractedDocument(new StringFromBuffer(new ResponseBody(new ResponseFromAjaxRequest(new CreatedOptions('url', href, 'method', 'GET', 'headers', headers, 'progressEvent', function () {
    if (event.lengthComputable) {
      var percentComplete = parseInt(event.loaded / event.total * 100);
      progressBar.value = percentComplete;
    }
  }, 'loadStartEvent', function () {
    if (progressBarClassName) {
      progressBar = document.createElement('progress');
      progressBar.setAttribute('class', progressBarClassName);
      progressBar.max = 100;
      progressBar.value = 25;

      if (progressBarPlace) {
        document.querySelector(progressBarPlace).prepend(progressBar);
      } else {
        document.body.prepend(progressBar);
      }
    }
  }, 'loadEndEvent', function () {
    progressBar.parentNode.removeChild(progressBar);
  }))))).as('DOC').after(new BodyOfDocument(as('DOC')).as('BODY').after(new TitleOfDocument(as('DOC')).as('TITLE').after(new FaviconOfDocument(as('DOC')).as('FAVICON').after(new UpdatedStateInHistory(new CreatedOptions('url', location.href, 'headers', headers, 'scrollY', window.pageYOffset || document.documentElement.scrollTop, 'documentElementClientHeight', document.documentElement.clientHeight, 'documentBodyClientHeight', document.body.clientHeight), location.href).after(new PushedStateToHistory(new CreatedOptions('url', href, 'headers', headers), href).after(new ReplacedElementWithAnotherOne(document.body, as('BODY')).after(new ChangedPageTitle(document, as('TITLE')).after(new ChangedPageFavicon(document, as('FAVICON'))))))))))));
};

module.exports = TurboRedirected;
