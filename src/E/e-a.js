const responseFromAjaxRequest = require('./../responseFromAjaxRequest')
const evaluatedStringWithParams = require('./../evaluatedStringWithParams')
const evaluateStringWithActionsOnProgress = require('./../evaluateStringWithActionsOnProgress')

module.exports = (node) => {
  const href = node.getAttribute('data-href')
  if (!href) {
    throw new Error('e-a must have "data-href" attribute')
  }

  if (!window.__ehtmlPageCache__) {
    window.__ehtmlPageCache__ = {}
    window.addEventListener('popstate', () => {
      updatePage(window.__ehtmlPageCache__[window.location.href])
    })
  }

  const a = document.createElement('a')
  a.href = href
  a.innerHTML = node.innerHTML
  for (let i = 0; i < node.attributes.length; i++) {
    if (node.attributes[i].name !== 'data-href') {
      a.setAttribute(
        node.attributes[i].name,
        node.attributes[i].value
      )
    }
  }
  node.parentNode.replaceChild(a, node)

  a.addEventListener('click', (event) => {
    event.preventDefault()

    if (a.hasAttribute('data-actions-on-progress-start')) {
      evaluateStringWithActionsOnProgress(
        a.getAttribute('data-actions-on-progress-start'),
        a
      )
    }

    responseFromAjaxRequest({
      url: encodeURI(href),
      method: 'GET',
      headers: JSON.parse(
        evaluatedStringWithParams(
          a.getAttribute('data-request-headers')
        ) || '{}'
      )
    }, undefined, (err, resObj) => {
      if (err) {
        throw err
      }

      window.history.pushState(null, null, href)

      const html = new DOMParser().parseFromString(resObj.body, 'text/html')
      window.__ehtmlPageCache__[window.location.href] = html
      updatePage(html)

      if (a.hasAttribute('data-actions-on-progress-end')) {
        evaluateStringWithActionsOnProgress(
          a.getAttribute('data-actions-on-progress-end'),
          a
        )
      }
    })
  })
}

function updatePage (html) {
  const title = html.title
  const head = html.head
  const body = html.body

  document.title = title

  const scripts = head.querySelectorAll('script')
  const stylesAsLink = head.querySelectorAll('link[rel="stylesheet"]')
  const styles = head.querySelectorAll('style')

  scripts.forEach(script => {
    if (script.src && !document.querySelector(`script[src="${script.src}"]`)) {
      const newScript = document.createElement('script')
      newScript.setAttribute('type', 'text/javascript')
      newScript.src = script.src
      document.head.appendChild(newScript)
    } else {
      const newScript = document.createElement('script')
      newScript.setAttribute('type', 'text/javascript')
      newScript.textContent = script.textContent
      document.head.appendChild(newScript)
    }
  })
  stylesAsLink.forEach(style => {
    if (style.href && document.querySelector(`script[href="${style.href}"]`)) {
      const newStyle = document.createElement('link')
      newStyle.setAttribute('rel', 'stylesheet')
      newStyle.href = style.href
      document.head.appendChild(newStyle)
    }
  })
  styles.forEach(style => {
    const newStyle = document.createElement('style')
    newStyle.textContent = style.textContent
    document.head.appendChild(newStyle)
  })

  document.body.innerHTML = body.innerHTML
}
