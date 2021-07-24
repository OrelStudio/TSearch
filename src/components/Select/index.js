import React , { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron'
import { UserOutlined } from '@ant-design/icons'
import Dropdown from 'react-dropdown'
import Select from 'react-select'

import Torrent from '../../components/Select/torrent.js'
import '../../css/main.scss'

const Selector = props => {
    const [selectedOption, setSelectedOption] = useState(null)

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
            Torrent.enableProvider(res[0])
        } else if(res.length > 1) {
            Torrent.disableAllProviders()
        } else {
            Torrent.disableProvider(res[0])
        }
    }

    const handleChange = value => {
        if(selectedOption) {
            checkDifference(value, selectedOption)
        } else {
            Torrent.enableProvider(value[0])
        }
        setSelectedOption(value)
    }

    return (
        <Select
            placeholder={'Select providers'}
            value={selectedOption}
            onChange={handleChange}
            options={options}
            className={'select'}
            isMulti
        />
    )
};

export default Selector
