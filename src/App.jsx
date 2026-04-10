import { useState, createContext, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'

/* Context to let child routes (LandingPage) override the floating WA button URL */
const WhatsAppContext = createContext({ setWhatsappUrl: () => {} })
export const useWhatsAppContext = () => useContext(WhatsAppContext)

function App() {
  const [whatsappUrl, setWhatsappUrl] = useState(null)

  return (
    <WhatsAppContext.Provider value={{ setWhatsappUrl }}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton url={whatsappUrl} />
    </WhatsAppContext.Provider>
  )
}

export default App
