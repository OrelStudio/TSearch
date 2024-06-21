import React , { useState, useEffect, useMemo } from 'react';
import { ipcRenderer } from 'electron'
import SelectProviders from './select'

import useTorrentStore from '../../useTorrentStore'
import '../../css/main.scss'

const Selector = props => {
  const [selectedOption, setSelectedOption] = useState(null)
  const selectedProviders = useTorrentStore(state => state.selectedProviders)

  const setCanSearch = useTorrentStore(state => state.setCanSearch)
  const enableProvider = useTorrentStore(state => state.enableProvider)
  const disableProvider = useTorrentStore(state => state.disableProvider)
  const disableAllProviders = useTorrentStore(state => state.disableAllProviders)
  const setSelectedProviders = useTorrentStore(state => state.setSelectedProviders)


  
  // events
  const onEnableProvider = useTorrentStore(state => state.onEnableProvider)
  const onDisableProvider = useTorrentStore(state => state.onDisableProvider)
  const onDisableAllProviders = useTorrentStore(state => state.onDisableAllProviders)

  useEffect(() => {
    setSelectedOption(selectedProviders)
  }, [])

  useEffect(() => {
    ipcRenderer.on('torrent:enable:response', onEnableProvider)
    ipcRenderer.on('torrent:disable:response', onDisableProvider)
    ipcRenderer.on('torrent:disable:all:response', onDisableAllProviders)
    return () => {
      ipcRenderer.removeListener('torrent:enable:response', onEnableProvider)
      ipcRenderer.removeListener('torrent:disable:response', onDisableProvider)
      ipcRenderer.removeListener('torrent:disable:all:response', onDisableAllProviders)
    }
  })

  const options = useMemo(() => [
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
  ], [])

  const checkDifference = (firstArray, secondArray) => {
    let isAdded = true
    let res = firstArray.filter(provider => !secondArray.includes(provider))
    if(!res[0]) {
      isAdded = false
      res = secondArray.filter(provider => !firstArray.includes(provider))
    }
    if(isAdded) {
      setCanSearch(true)
      enableProvider(res[0])
    } else if(res.length > 1) {
      setCanSearch(false)
      disableAllProviders()
    } else {
      if(selectedOption.length === 1) {
        setCanSearch(false)
      }
      disableProvider(res[0])
    }
  }

  const handleChange = value => {
    if(selectedOption) {
      checkDifference(value, selectedOption)
    } else {
      setCanSearch(true)
      enableProvider(value[0])
    }
    setSelectedProviders(value)
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
