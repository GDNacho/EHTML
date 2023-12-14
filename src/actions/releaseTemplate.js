const isTemplate = require('./../isTemplate')
const mapToTemplate = require('./../actions/mapToTemplate')

function releaseTemplate (elmSelectorOrElm) {
  const elmIsSelector = typeof elmSelectorOrElm === 'string'
  const template = elmIsSelector
    ? document.querySelector(elmSelectorOrElm)
    : elmSelectorOrElm
  if (template === null || template === undefined) {
    if (elmIsSelector) {
      throw new Error(`template with selector ${elmSelectorOrElm} is not found`)
    }
    throw new Error(`template in releaseTemplate() is not found`)
  }
  if (!isTemplate(template)) {
    throw new Error('releaseTemplate() handles only <template> elements')
  }
  mapToTemplate(template)
}

window.releaseTemplate = releaseTemplate
module.exports = releaseTemplate