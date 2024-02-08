const isTemplateWithTypeExclusively = require('./isTemplateWithTypeExclusively')
const isTemplateWithType = require('./isTemplateWithType')
const isTemplate = require('./isTemplate')

module.exports = (node) => {
  if (isTemplateWithType(node, 'e-json')) {
    return 'e-json-template'
  }
  if (isTemplateWithTypeExclusively(node, 'e-page-with-url')) {
    return 'e-page-with-url-template'
  }
  if (isTemplateWithTypeExclusively(node, 'e-if')) {
    return 'e-if-template'
  }
  if (isTemplateWithTypeExclusively(node, 'e-for-each')) {
    return 'e-for-each-template'
  }
  if (isTemplateWithTypeExclusively(node, 'e-wrapper')) {
    return 'e-wrapper-template'
  }
  if (isTemplateWithTypeExclusively(node, 'e-ws')) {
    return 'e-ws-template'
  }
  if (isTemplate(node) && node.hasAttribute('is')) {
    return `${node.getAttribute('is')}-template`
  }
  return node.nodeName.toLowerCase()
}
