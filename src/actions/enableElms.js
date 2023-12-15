const elms = require('./../elms')

function enableElms (...elmSelectors) {
  elmSelectors.forEach(elmSelector => {
    if (elmSelector) {
      const elements = elms(elmSelector)
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        element.removeAttribute('disabled')
      }
    }
  })
}

window.enabledElms = enableElms
module.exports = enableElms
