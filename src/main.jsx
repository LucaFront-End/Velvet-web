import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import GalleryPage from './pages/GalleryPage'
import ServicesIndexPage from './pages/ServicesIndexPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="servicios" element={<ServicesIndexPage />} />
            <Route path="servicios/:slug" element={<ServicePage />} />
            <Route path="galeria" element={<GalleryPage />} />
            <Route path="contacto" element={<ContactPage />} />
            <Route path="nosotros" element={<AboutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)

