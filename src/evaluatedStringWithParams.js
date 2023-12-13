const pattern = /\${([^}]+)}/g

module.exports = (string, node) => {
  if (!string) {
    return null
  }
  return string.replace(pattern, (match, expression) => {
    const inlinedExpression = expression.replace(/\n/g, ' ')
    // eslint-disable-next-line no-eval
    const evaluationResult = eval('(function() { const thisElement = node; return (' + inlinedExpression + ')})()')
    if (typeof evaluationResult === 'object') {
      return JSON.stringify(evaluationResult)
    }
    return evaluationResult
  })
}
