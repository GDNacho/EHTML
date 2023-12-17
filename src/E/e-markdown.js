const responseFromAjaxRequest = require('./../responseFromAjaxRequest')
const unwrappedChildrenOfParent = require('./../unwrappedChildrenOfParent')
const evaluatedStringWithParams = require('./../evaluatedStringWithParams')
const evaluateStringWithActionsOnProgress = require('./../evaluateStringWithActionsOnProgress')
const showdown = require('showdown')
const showdownHighlight = require('showdown-highlight')
const scrollToHash = require('./../scrollToHash')

module.exports = (node) => {
  const extensions = []
  if (node.getAttribute('data-apply-code-highlighting')) {
    extensions.push(
      showdownHighlight({
        // Whether to add the classes to the <pre> tag, default is false
        pre: true,
        // Whether to use hljs' auto language detection, default is true
        auto_detection: true
      })
    )
  }
  if (node.hasAttribute('data-actions-on-progress')) {
    evaluateStringWithActionsOnProgress(
      node.getAttribute('data-actions-on-progress'),
      node
    )
  }
  responseFromAjaxRequest({
    url: encodeURI(node.getAttribute('data-src')),
    method: 'GET',
    headers: JSON.parse(
      evaluatedStringWithParams(
        node.getAttribute('data-headers')
      ) || '{}'
    )
  }, undefined, (err, resObj) => {
    if (err) {
      throw err
    }
    showdown.setFlavor('github')
    node.innerHTML = new showdown.Converter({
      tables: true,
      tasklists: true,
      simpleLineBreaks: true,
      emoji: true,
      moreStyling: true,
      github: true,
      extensions: extensions
    }).makeHtml(resObj.body)
    unwrappedChildrenOfParent(node)
    scrollToHash()
  })
}
