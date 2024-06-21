class Logger {
  constructor(name) {
    this.name = `[${name}]`
  }

  log(ev, message) {
    console.group(`%c${this.name} %c${ev}: `, 'color: darkturquoise;font-weight:bold;','color:black')
    console.log(message)
    console.groupEnd()
  }
}

export default Logger
