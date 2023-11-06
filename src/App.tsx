import { Routes, Route } from "react-router-dom"
import { Container } from 'react-bootstrap'
import { Store } from './pages/Store'
import { About } from './pages/About'
import { Navbar }from './components/Navbar'
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { Register } from './pages/Register'

function App() {
  return (
    <ShoppingCartProvider>
    <Navbar />
    <Container className="mb-4">
      <Routes>
        <Route path="/store" element ={<Store />} />
        <Route path="/" element ={<Register />} />
        <Route path="/about" element ={<About />} />
      </Routes>
    </Container>
    </ShoppingCartProvider>
  )
}

export default App
