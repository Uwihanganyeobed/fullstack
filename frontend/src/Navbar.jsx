import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
      <nav className='bg-green-600 p-3 text-white flex justify-evenly items-center'>
        <Link to={'/'}>Home</Link>
        <Link to={'/create'}>Add new Products</Link>
        <Link to={'/login'}>Login</Link>
        <Link to={'/register'}>Get Started</Link>
      </nav>
      <div>
        {/* /GET/me API*/}
      </div>
    </div>
  )
}
