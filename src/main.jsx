import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Import all styles
import './styles/globals.css'
import './styles/animations.css'
import './styles/cosmic-theme.css'
import './styles/portal-loader.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)