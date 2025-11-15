import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import DBProvider from './contexto/databaseContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DBProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DBProvider>
  </StrictMode>,
)
