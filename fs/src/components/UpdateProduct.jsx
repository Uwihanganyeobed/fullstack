import React, { useEffect, useState } from 'react'
import { getProduct, updateProduct } from '../lib/api'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdateProduct() {
  const navigate = useNavigate()
  const [name,setName] = useState('')
  const [price,setPrice] = useState('')
  const [category,setCategory] = useState('')

  const id = useParams().id

  const fetchProduct = async()=>{
    try {
      const res = await getProduct(id)
      console.log('daata',res.data.results)

      const product = res.data.results[0];

      setName(product.name)
      setPrice(product.price)
      setCategory(product.category)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchProduct()
  },[])

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const res = await updateProduct(id, {name,price,category})
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
      <h2 style={styles.title}>Update product form</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>Name</label>
        <input style={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
        <label style={styles.label}>Price</label>
        <input style={styles.input} value={price} onChange={(e) => setPrice(e.target.value)} />
        <label style={styles.label}>Category</label>
        <input style={styles.input} value={category} onChange={(e) => setCategory(e.target.value)} />
        <button type='submit' style={styles.button}>Update</button>
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
