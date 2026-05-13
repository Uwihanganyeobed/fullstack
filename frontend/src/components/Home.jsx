import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../lib/api';

export default function Home() {
  const [products,setProducts] = useState([]);

  const fetchProducts = async()=>{
   try {
    const res = await getProducts();
    console.log(res.data.results)
    setProducts(res.data.results)
   } catch (error) {
    console.log(error)
   }
  }

  useEffect(()=>{
    fetchProducts()
  },[])

  return (
    <div>
      <h2>Product Management</h2>
      <Link to={'/create'}>Go to create products</Link>
      <table>
        <thead>
          <tr>
            <th>Product name</th>
            <th>Product price</th>
            <th>Product category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product)=>(
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
                <Link to={`/edit/${product.id}`}>Edit</Link>
                <button>Delete</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}
