const copyButton = document.querySelector('#copy')

if (copyButton) {
  copyButton.addEventListener('click', () => {
    const range = document.createRange()
    range.selectNode(document.querySelector('#URL'))
    window.getSelection().removeAllRanges() // clear current selection
    window.getSelection().addRange(range) // select text
    document.execCommand('copy')
    window.getSelection().removeAllRanges() // deselect

    window.alert(`${document.querySelector('#URL').textContent} has been copied to clipboard 📋`)
  })
}
