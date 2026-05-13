import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../lib/api';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const res = await register({name,email,password,role})
      alert('Registered successful');
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Register</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>Name</label>
        <input style={styles.input} value={name} onChange={(e)=>setName(e.target.value)} />
        <label style={styles.label}>Email</label>
        <input style={styles.input} type='email' value={email} onChange={(e)=>setEmail(e.target.value)}  />
         <label style={styles.label}>Password</label>
        <input style={styles.input} value={password} onChange={(e)=>setPassword(e.target.value)}  />
         <label style={styles.label}>Role</label>
        <select name="role" id="role" style={styles.select} value={role} onChange={(e)=>setRole(e.target.value)}>
          <option value="user" >User</option>
          <option value="admin">Admin</option>
        </select>
        <button style={styles.button} type='submit'>Register</button>
      </form>
    </div>
  )
}

const styles = {
  page: { padding: '24px', maxWidth: '420px', margin: '0 auto' },
  title: { marginBottom: '14px', fontSize: '1.4rem' },
  form: { display: 'grid', gap: '12px' },
  label: { fontSize: '0.95rem' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #ccc' },
  select: { padding: '10px', borderRadius: '6px', border: '1px solid #ccc' },
  button: { padding: '10px 16px', borderRadius: '6px', border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' }
}
