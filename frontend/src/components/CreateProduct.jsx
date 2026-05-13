import React, { useState } from 'react'
import { createProduct } from '../lib/api'
import { useNavigate } from 'react-router-dom';
export default function CreateProduct() {

  const [name,setName] =useState('');
  const [price,setPrice] =useState(0);
  const [category,setCategory] =useState('');

  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const res = await createProduct({name,price,category});
      navigate('/')
      setName('')
      setPrice('')
      setCategory('')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='w-full flex items-center justify-between flex-col'>
      <h1>Create product form</h1>
      <form onSubmit={handleSubmit}>
        Product Name
        <input type="text" value={name} /> <br /> <br />
        Product Price
        <input type="number" /> <br /> <br />
        Product Category
        <input type="text" /> <br /> <br />
        <button type='submit' className='bg-green-600 text-white rounded p-2'>Create Product</button>
      </form>
    </div>
  )
}
