import React from 'react'

export default function Create() {
  return (
    <div className=' flex flex-col w-full'>
        <h1 className='text-cyan-700 '>Create new Employees</h1>
        <form className='bg-green-700 m-2 flex flex-col gap-2 '>
            <label>Name:</label>
            <input type='text'placeholder='Enter names' />
            <label>Age: </label>
            <input type='number' placeholder='Enter your age' />
            <label>Salary: </label>
            <input type='' placeholder='Enter the salary' />
            <label>Department: </label>
            <input type='text' placeholder='Enter Department' />
            <button>submit</button> 
        </form>
    </div>
  )
}
