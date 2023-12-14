const elms = require('./../elms')

function hideElms (...elmSelectors) {
  elmSelectors.forEach(elmSelector => {
    if (elmSelector) {
      const elements = elms(elmSelector)
      for (let i = 0; i < elms.length; i++) {
        const element = elements[i]
        element.style.display = 'none'
      }
    }
  })
}

window.hideElms = hideElms
module.exports = hideElms
