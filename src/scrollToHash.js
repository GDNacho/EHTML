module.exports = () => {
  if (window.location.hash.length > 1) {
    const hashElm = document.getElementById(window.location.hash.split('#')[1])
    if (hashElm) {
      hashElm.scrollIntoView({ behaviour: 'smooth' })
    }
  }
}
