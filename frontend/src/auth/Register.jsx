import React from 'react'

export default function Register() {
  return (
    <div className=' flex items-center justify-between w-full flex-col bg-gray-300 p-2'>
      <h2>Sign in to the account</h2>
      <form>
        name: 
        <input type="text" /> <br /> <br />
         Email: 
        <input type="email" /> <br /> <br />
        Password: 
        <input type="password" /> <br /> <br />
         Role:
         <select name="role" id="">
          <option value="admin">Admin</option>
          <option value="user">User</option>
         </select>
        <button className=' w-full bg-green-600 text-white p-2 rounded' type='submit'>Register  </button>
      </form>
    </div>
  )
}
