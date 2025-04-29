# TSearch

*A simple, desktop application that lets you effortlessly search and download torrents from multiple popular providers, all from one convenient place.*
https://orelstudio.github.io/TSearch/
---

## 🔍 Overview

TSearch solves the hassle of manually searching for torrents across various websites. With a sleek and intuitive interface, it aggregates results from multiple torrent providers, making it quick and simple to find exactly what you're looking for.

---

## ⚡ Core Features

- **Multi-source Torrent Search:** Search simultaneously across multiple torrent providers.
- **Magnet & Direct Download:** Choose between one-click magnet links or direct downloads via WebTorrent.
- **User-friendly Interface:** Navigate and manage your searches seamlessly in a clean React-powered interface.

---

## 🌐 Supported Providers  

TSearch currently queries the following popular torrent sources:

- Torrent9  
- Torrentz2  
- 1337x  
- ThePirateBay  
- KickassTorrents  
- RARBG  
- TorrentProject  
- YTS  
- Limetorrents  
- EZTV  

---

## 🛠️ Tech Stack  

- **Frontend:** React
- **Desktop Shell:** Electron
- **Torrent Search:** `torrent-search-api`
- **Torrent Downloading:** `WebTorrent`
- **Bundling & Build Tooling:** Webpack & Babel
- **Installer:** Inno Setup (Windows executable)

---

## ⚙️ How it Works

1. **User searches for torrents:**  
   Renderer process sends an IPC message to Electron’s main process.

2. **Main process searches torrents:**  
   The main process performs searches using `torrent-search-api` across selected providers.

3. **Unified results returned:**  
   Search results are returned to the renderer process, neatly displayed for the user.

4. **Torrent download initiated:**  
   - Clicking **Download** uses the WebTorrent Library to download the selected torrent directly within the app.
   - Clicking **Magnet** opens the magnet link in the user's default torrent client.

---

## 🚀 Installation & Setup

### Installation Setup
Download the installation setup from https://orelstudio.github.io/TSearch/

### Development Setup
Clone the repo, switch to the project directory, and install Node 16.20.2 with **nvm** before installing dependencies:

```bash
git clone https://github.com/OrelStudio/TSearch.git
cd tsearch

nvm install 16.20.2
nvm use 16.20.2

npm install
npm start
```
