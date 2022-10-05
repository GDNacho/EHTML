'use strict'

const { as } = require('./../cutie/exports')
const { StringFromBuffer } = require('./../async-string/exports')
const { ResponseFromAjaxRequest, ResponseBody } = require('./../async-ajax/exports')
const { CreatedOptions } = require('./../async-object/exports')
const { ReplacedElementWithAnotherOne, ExtractedDocument, BodyOfDocument, TitleOfDocument, FaviconOfDocument, ChangedPageTitle, ChangedPageFavicon } = require('./../async-dom/exports')
const { PushedStartStateToHistoryIfNeeded, PushedStateToHistory, UpdatedStateInHistory } = require('./../async-history/exports')

class TurboRedirected {
  constructor (href, headers, { progressBarPlace, progressBarClassName, ajaxFavicon }) {
    let progressBar
    return new PushedStartStateToHistoryIfNeeded(
      new CreatedOptions(
        'url', location.href,
        'headers', headers,
        'scrollY', window.pageYOffset || document.documentElement.scrollTop,
        'documentElementClientHeight', document.documentElement.clientHeight,
        'documentBodyClientHeight', document.body.clientHeight
      ), location.href
    ).after(
      new ChangedPageFavicon(
        document, ajaxFavicon, true
      ).after(
        new ExtractedDocument(
          new StringFromBuffer(
            new ResponseBody(
              new ResponseFromAjaxRequest(
                new CreatedOptions(
                  'url', href,
                  'method', 'GET',
                  'headers', headers,
                  'progressEvent', () => {
                    if (event.lengthComputable) {
                      const percentComplete = parseInt((event.loaded / event.total) * 100)
                      progressBar.value = percentComplete
                    }
                  },
                  'loadStartEvent', () => {
                    if (progressBarClassName) {
                      progressBar = document.createElement('progress')
                      progressBar.setAttribute('class', progressBarClassName)
                      progressBar.style.display = 'none'
                      progressBar.max = 100
                      progressBar.value = 25
                      if (progressBarPlace) {
                        document.querySelector(progressBarPlace).prepend(progressBar)
                      } else {
                        document.body.prepend(progressBar)
                      }
                    }
                    progressBar.style.display = ''
                  },
                  'loadEndEvent', () => {
                    progressBar.parentNode.removeChild(progressBar)
                  }
                )
              )
            )
          )
        ).as('DOC').after(
          new BodyOfDocument(
            as('DOC')
          ).as('BODY').after(
            new TitleOfDocument(
              as('DOC')
            ).as('TITLE').after(
              new FaviconOfDocument(
                as('DOC')
              ).as('FAVICON').after(
                new UpdatedStateInHistory(
                  new CreatedOptions(
                    'url', location.href,
                    'headers', headers,
                    'scrollY', window.pageYOffset || document.documentElement.scrollTop,
                    'documentElementClientHeight', document.documentElement.clientHeight,
                    'documentBodyClientHeight', document.body.clientHeight
                  ),
                  location.href
                ).after(
                  new PushedStateToHistory(
                    new CreatedOptions(
                      'url', href,
                      'headers', headers
                    ),
                    href
                  ).after(
                    new ReplacedElementWithAnotherOne(
                      document.body,
                      as('BODY')
                    ).after(
                      new ChangedPageTitle(
                        document,
                        as('TITLE')
                      ).after(
                        new ChangedPageFavicon(
                          document,
                          as('FAVICON')
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  }
}

module.exports = TurboRedirected
