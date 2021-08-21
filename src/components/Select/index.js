import React , { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron'
import SelectProviders from './select'

import Torrent from '../../ipcRenderer/torrent.js'
import '../../css/main.scss'

const Selector = props => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [firstTime, setFirstTime] = useState(true)

  if(firstTime) {
    setSelectedOption(Torrent.getSelectedProviders())
    setFirstTime(false)
  }

  useEffect(() => {
    ipcRenderer.on('torrent:enable:response', Torrent.onEnableProvider)
    ipcRenderer.on('torrent:disable:response', Torrent.onDisableProvider)
    ipcRenderer.on('torrent:disable:all:response', Torrent.onDisableAllProviders)
    return () => {
      ipcRenderer.removeListener('torrent:enable:response', Torrent.onEnableProvider)
      ipcRenderer.removeListener('torrent:disable:response', Torrent.onDisableProvider)
      ipcRenderer.removeListener('torrent:disable:all:response', Torrent.onDisableAllProviders)
    }
  })

  const options = [
      { value: 'Torrent9', label: 'Torrent9' },
      { value: 'Torrentz2', label: 'Torrentz2' },
      { value: '1337x', label: '1337x' },
      { value: 'ThePirateBay', label: 'ThePirateBay' },
      { value: 'KickassTorrents', label: 'KickassTorrents' },
      { value: 'Rarbg', label: 'Rarbg' },
      { value: 'TorrentProject', label: 'TorrentProject' },
      { value: 'Yts', label: 'Yts' },
      { value: 'Limetorrents', label: 'Limetorrents' },
      { value: 'Eztv', label: 'Eztv' }
  ];

  const checkDifference = (firstArray, secondArray) => {
    let isAdded = true
    let res = firstArray.filter(provider => !secondArray.includes(provider))
    if(!res[0]) {
      isAdded = false
      res = secondArray.filter(provider => !firstArray.includes(provider))
    }
    if(isAdded) {
      Torrent.setSearch(true)
      Torrent.enableProvider(res[0])
    } else if(res.length > 1) {
      Torrent.setSearch(false)
      Torrent.disableAllProviders()
    } else {
      if(selectedOption.length === 1) {
        Torrent.setSearch(false)
      }
      Torrent.disableProvider(res[0])
    }
  }

  const handleChange = value => {
    if(selectedOption) {
      checkDifference(value, selectedOption)
    } else {
      Torrent.setSearch(true)
      Torrent.enableProvider(value[0])
    }
    Torrent.setSelectedProviders(value)
    setSelectedOption(value)
  }

  return (
    <SelectProviders
      value={selectedOption}
      onChange={handleChange}
      options={options}
    />
  )
};

export default Selector
