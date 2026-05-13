import React from 'react'

export default function UpdateProduct() {
   return (
    <div className='w-full flex items-center justify-between flex-col'>
      <h1>Update product form</h1>
      <form>
        Product Name
        <input type="text" /> <br /> <br />
        Product Price
        <input type="number" /> <br /> <br />
        Product Category
        <input type="text" /> <br /> <br />
        <button type='submit' className='bg-green-600 text-white rounded p-2'>Update Product</button>
      </form>
    </div>
  )
}
