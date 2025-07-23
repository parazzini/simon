# 🎮 Simon Game — Progressive Web App

A modern and responsive web version of the classic **Simon memory game**, built using **HTML**, **CSS**, and **JavaScript**, with full **Progressive Web App (PWA)** support. Playable directly in the browser and installable on any device, even offline.

---

## 📌 Table of Contents

- [Features](#-features)
- [How to Play](#-how-to-play)
- [PWA Installation](#-pwa-installation)
- [Project Structure](#-project-structure)
- [Manifest Overview](#-manifest-overview)
- [Local Development](#-local-development)
- [License](#-license)
- [Credits](#-credits)

---

## ✅ Features

- 5 pages (home, rules, gameplay, lose and victory)
- Custom grid (2x2, 3x3, 4x4) and difficulty (easy, medium, hard)
- Animated and modern UI
- Offline functionality via service worker
- Installable as a Modern Web App
- Commented code

---

## 🕹️ How to Play

1. A random color sequence is shown.
2. Repeat the sequence by clicking the same buttons.
3. Each round, the sequence becomes longer.
4. If you make a mistake, you lose.
5. Reach the final level to win!

---

## 📲 PWA Installation

This game is installable on most modern browsers:

### 🖥️ Desktop
- Open `index.html` or hosted version in Chrome/Edge.
- Click the install icon in the address bar.

### 📱 Mobile
- Open the game in Chrome (Android).
- Tap the three-dot menu > **Add to Home Screen**.
- Launch it like a native app!

---

## 📁 Project Structure

├── index.html - Home page
├── win.html - Victory screen
├── lose.html - Game over screen
├── principale.html - Main game page
├── script.js 
├── style.css 
├── manifest.json - Web App Manifest
├── service-worker.js - Service worker for PWA
├── immagini/ - Images

---

## 🧾 Manifest Overview

```json
{
  "name": "Gioco Simon",
  "short_name": "Simon",
  "id": "simon",
  "description": "Semplice applicazione che simula il gioco del Simon con una grafica semplice e divertente.",
  "icons": [
    {
      "src": "immagini/simon.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "start_url": "index.html",
  "scope": "/",
  "display": "standalone"
}
```
---

## ⚙️ Local Development
Clone the repository and open index.html in a local server to test PWA features:

```bash
git clone https://github.com/parazzini/simon-game
cd simon-game
```
You can use Live Server for VS Code or any HTTP server.

## 📄 License
This project is licensed under the MIT License.

## 🙌 Credits
- Fonts by Google Fonts – Poppins
- Inspired by the original Simon Electronic Game
