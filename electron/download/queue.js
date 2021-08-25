const { ipcMain } = require('electron')
const { sendToRenderer } = require('../index.js')

const addToQueue = (item) => {
  sendToRenderer('queue:add', item)
}
const updateQueueItem = (item) => {
  sendToRenderer('queue:update', item)
}
const removeFromQueue = (magnet) => {
  sendToRenderer('queue:remove', magnet)
}

module.exports = {
  addToQueue,
  updateQueueItem,
  removeFromQueue
}
