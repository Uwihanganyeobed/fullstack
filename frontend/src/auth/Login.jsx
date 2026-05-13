import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../lib/api';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault()

    try {
      const res = await login({email,password})
      localStorage.setItem('token',res.data.token)
      window.location.reload
      alert('login successful')
      navigate('/')
      setEmail('')
      setPassword('')
    } catch (error) {
      console.log(error)
    } 
  }
  return (
    <div className=' flex items-center justify-between w-full flex-col bg-gray-300 p-2'>
      <h2>Sign in to the account</h2>
      <form onSubmit={handleSubmit}>
        Email: 
        <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} /> <br /> <br />
        Password: 
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} /> <br /> <br />
        <button className=' w-full bg-green-600 text-white p-2 rounded' type='submit'>Login</button>
      </form>
    </div>
  )
}
