import React, { useState } from 'react'
import { createProduct } from '../lib/api'
import { useNavigate } from 'react-router-dom'
export default function CreateProduct() {
  const navigate = useNavigate()
  const [name,setName] = useState('')
  const [price,setPrice] = useState('')
  const [category,setCategory] = useState('')

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const res = await createProduct({name,price,category})
      console.log(res.data)
      setCategory('')
      setName('')
      setPrice('')
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Create product form</h2>

      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>Name</label>
        <input style={styles.input} type='text' value={name} onChange={(e)=> setName(e.target.value)} />
        <label style={styles.label}>Price</label>
        <input style={styles.input} type='number' value={price} onChange={(e)=> setPrice(e.target.value)} />
        <label style={styles.label}>Category</label>
        <input style={styles.input} type='text' value={category} onChange={(e)=> setCategory(e.target.value)} />
        <button type='submit' style={styles.button}>Create</button>
      </form>
    </div>
  )
}

const styles = {
  page: { padding: '24px', maxWidth: '500px', margin: '0 auto' },
  title: { marginBottom: '14px', fontSize: '1.3rem' },
  form: { display: 'grid', gap: '12px' },
  label: { fontSize: '0.95rem' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #ccc' },
  button: { padding: '10px 16px', borderRadius: '6px', border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' }
}
