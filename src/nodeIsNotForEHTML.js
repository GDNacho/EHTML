module.exports = (node) => {
  if (node.parentElement && node.parentElement.closest('[data-no-ehtml="true"]')) {
    return true
  }
  return node.hasAttribute('data-no-ehtml') && (node.getAttribute('data-no-ehtml') === 'true')
}
