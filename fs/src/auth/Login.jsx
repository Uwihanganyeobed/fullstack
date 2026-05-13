import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../lib/api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')


  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/login');
      window.location.reload();
    } catch (error) {
      setError(error.response.data.message || 'Login failed');
      console.log(error)
    }
  }
  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>Email</label>
        <input style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
        <label style={styles.label}>Password</label>
        <input style={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
        <button style={styles.button} type='submit'>Login</button>
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
  button: { padding: '10px 16px', borderRadius: '6px', border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' }
}
