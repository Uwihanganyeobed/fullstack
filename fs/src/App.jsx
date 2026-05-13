import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import CreateProduct from './components/CreateProduct'
import UpdateProduct from './components/UpdateProduct'
import Navbar from './Navbar'
import Login from './auth/Login'
import Register from './auth/Register'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <div style={styles.app}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
          <Route path='/edit/:id' element={<ProtectedRoute><UpdateProduct /></ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

const styles = {
  app: { fontFamily: 'Arial, sans-serif', color: '#111', minHeight: '100vh', background: '#f8fafc' }
}
