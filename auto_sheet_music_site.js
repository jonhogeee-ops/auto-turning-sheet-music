// This is a full React + Vite project structure with auto-sheet-music viewer code.
// You can download, zip, and upload to GitHub for free Vercel hosting.

// package.json
{
  "name": "auto-sheet-music",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^5.0.0"
  }
}

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react()] });

// index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Auto Sheet Music</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="src/main.jsx"></script>
  </body>
</html>

// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// src/App.jsx
import React, { useState, useEffect } from 'react';

function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [autoTurn, setAutoTurn] = useState(false);
  const [bpm, setBpm] = useState(60);

  useEffect(() => {
    let interval;
    if (autoTurn && images.length > 0) {
      interval = setInterval(() => {
        setCurrentPage(prev => (prev + 1) % images.length);
      }, (60 / bpm) * 1000);
    }
    return () => clearInterval(interval);
  }, [autoTurn, images, bpm]);

  const handleFiles = (e) => {
    const files = Array.from(e.target.files).map(f => URL.createObjectURL(f));
    setImages(files);
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Auto Sheet Music</h1>
      <input type="file" multiple accept="image/*" onChange={handleFiles} />
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setAutoTurn(!autoTurn)}>
          {autoTurn ? 'Stop Auto-Turn' : 'Start Auto-Turn'}
        </button>
        <input type="number" value={bpm} onChange={e => setBpm(e.target.value)} /> BPM
      </div>
      <div style={{ marginTop: '2rem' }}>
        {images.length > 0 && <img src={images[currentPage]} alt="sheet" style={{ maxWidth: '80%', maxHeight: '500px' }} />}
      </div>
      {images.length > 1 && (
        <div style={{ marginTop: '1rem' }}>
          <button onClick={() => setCurrentPage(prev => (prev - 1 + images.length) % images.length)}>Previous</button>
          <button onClick={() => setCurrentPage(prev => (prev + 1) % images.length)}>Next</button>
        </div>
      )}
    </div>
  );
}

export default App;

// src/index.css
body { font-family: sans-serif; background-color: #f5f5f5; }
