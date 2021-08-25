const fs = require('fs-extra')
const path = require('path')
const Promise = require('bluebird')

const historyPath = path.resolve(__dirname, '../../resources/history.json')
const downloadHistoryPath = path.resolve(__dirname, '../../resources/download.json')

const getHistory = (historyType) => {
  return new Promise((resolve, reject) => {
    fs.readJson(historyType === 'search' ? historyPath : downloadHistoryPath)
    .then(history => {
      return resolve(history)
    }).catch(err => {
      return reject(new TypeError(`failed reading history ${err}`))
    })
  })
}

const addItem = (item, historyType) => {
  return new Promise((resolve, reject) => {
    getHistory(historyType).then(history => {
      const data = history.concat(item)
      fs.writeJson(historyType === 'search' ? historyPath : downloadHistoryPath, data, {spaces: 2})
      .then(() => {
        return resolve('success!')
      })
      .catch(err => {
        return reject(new TypeError(`failed adding item ${err}`))
      })
    }).catch(error => {
      console.error(error);
    })
  })
}

module.exports = {
  getHistory,
  addItem
}
