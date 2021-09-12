const { getHistory } = require('./index')

const fetchHistory = (event, type) => {
  const history = getHistory(type).then(data => {
    event.reply('history:get:response', data)
  }).catch(err => {
    return [{error: 'failed fetching data'}]
  })
}

module.exports = {
  fetchHistory
}
