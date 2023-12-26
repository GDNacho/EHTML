const unwrappedChildrenOfParent = require('./../unwrappedChildrenOfParent')
const responseFromAjaxRequest = require('./../responseFromAjaxRequest')
const evaluatedStringWithParams = require('./../evaluatedStringWithParams')
const evaluateStringWithActionsOnProgress = require('./../evaluateStringWithActionsOnProgress')
const prettyHtml = require('json-pretty-html').default
const scrollToHash = require('./../scrollToHash')

module.exports = (node) => {
  if (node.hasAttribute('data-actions-on-progress-start')) {
    evaluateStringWithActionsOnProgress(
      node.getAttribute('data-actions-on-progress-start'),
      node
    )
  }
  responseFromAjaxRequest({
    url: encodeURI(node.getAttribute('data-src')),
    method: 'GET',
    headers: JSON.parse(
      evaluatedStringWithParams(
        node.getAttribute('data-headers') || '{}'
      )
    )
  }, undefined, (err, resObj) => {
    if (err) {
      throw err
    }
    const responseBodyAsBuffer = resObj.body
    const responseBodyAsObject = JSON.parse(
      responseBodyAsBuffer.toString('utf-8', 0, responseBodyAsBuffer.length)
    )
    node.innerHTML = prettyHtml(
      responseBodyAsObject
    )
    unwrappedChildrenOfParent(node)
    if (node.hasAttribute('data-actions-on-progress-end')) {
      evaluateStringWithActionsOnProgress(
        node.getAttribute('data-actions-on-progress-end'),
        node
      )
    }
    scrollToHash()
  })
}
