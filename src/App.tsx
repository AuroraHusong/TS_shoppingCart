import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import { Container } from 'react-bootstrap'
import { Store } from './pages/Store'
import { About } from './pages/About'
import { Navbar }from './components/Navbar'
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { Register } from './pages/Register'
import Login from './pages/Login'
function App() {
  const [user, setUser] = useState<string>('')
  return (
    <ShoppingCartProvider>
    <Navbar user={user} />
    <Container className="mb-4">
      <Routes>
        <Route path="/store" element ={<Store />} />
        <Route path="/" element ={<Register />} />
        <Route path="/about" element ={<About />} />
        <Route path="/login" element ={<Login setUser={setUser} />} />
      </Routes>
    </Container>
    </ShoppingCartProvider>
  )
}

export default App
