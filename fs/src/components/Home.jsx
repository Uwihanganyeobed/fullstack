import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteProduct, getProducts } from '../lib/api'

export default function Home() {
  const [products,setProducts] = useState([])
  
  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.results)
      console.log(res.data.results)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchProducts()
  },[])

  const handleDelete = async(id)=>{
    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
      alert`Product deleted successfully`
      // refresh()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div style={styles.page}>
      <h2 style={styles.title}>List of Products</h2>
      <Link style={styles.createLink} to={'/create'}>Create a Product</Link>
      <table style={styles.table} border={1}>
        <thead>
          <tr>
            <th style={styles.cell}>Name</th>
            <th style={styles.cell}>Price</th>
            <th style={styles.cell}>Category</th>
            <th style={styles.cell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product)=>(
            <tr key={product.id}>
              <td style={styles.cell}>{product.name}</td>
              <td style={styles.cell}>{product.price}</td>
              <td style={styles.cell}>{product.category}</td>
              <td style={styles.cell}>
                <div style={styles.actions}>
                  <Link to={`/edit/${product.id}`} style={styles.button}>Edit</Link>
                  <button onClick={()=>handleDelete(product.id)} style={styles.button}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const styles = {
  page: { padding: '24px', maxWidth: '900px', margin: '0 auto' },
  title: { marginBottom: '12px', fontSize: '1.4rem' },
  createLink: { display: 'inline-block', marginBottom: '16px', padding: '8px 14px', background: '#2563eb', color: '#fff', textDecoration: 'none', borderRadius: '6px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  cell: { padding: '10px', border: '1px solid #ccc', textAlign: 'left' },
  actions: { display: 'flex', gap: '8px' },
  button: { padding: '6px 12px', border: 'none', borderRadius: '5px', background: '#4b5563', color: '#fff', cursor: 'pointer' }
}
