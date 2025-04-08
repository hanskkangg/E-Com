import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'


// Create the root of the app and render it
createRoot(document.getElementById('root')).render(
  // Enables routing in the app
  <BrowserRouter>
    <ShopContextProvider>
      
     <App />

    </ShopContextProvider>
  </BrowserRouter>,
)
