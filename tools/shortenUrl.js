// ASCII
const container = []
for (let i = 48; i < 58; i++) {
  container.push(i)
}
for (let i = 65; i < 91; i++) {
  container.push(i)
}
for (let i = 97; i < 123; i++) {
  container.push(i)
}

function shortenUrl (shortenLength = 5) {
  let shorten = ''
  for (let i = 0; i < shortenLength; i++) {
    shorten += String.fromCharCode(container[Math.floor(Math.random() * container.length)])
  }
  return shorten
}

module.exports = { shortenUrl }
