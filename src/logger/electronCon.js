class Logger {
  constructor(name) {
    this.name = `[${name}]`
  }

  log(ev, message) {
    console.log(`${this.name}`, `${ev}: ${message}`)
  }
}

module.exports = Logger
//console.log('%c[Hello World!]: %cdsdfsdf', 'color: darkturquoise;font-weight:bold;','color:black')
