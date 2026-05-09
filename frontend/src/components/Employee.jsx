import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/employees")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  console.log(users)
  return (
    <div className="p-6 bg-gray-300 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Employees List
      </h2>
        <Link className='text-cyan-800 text-lg' to="/create">Create a new Employee</Link>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 border">ID</th>
              <th className="py-3 px-4 border">Name</th>
              <th className="py-3 px-4 border">Age</th>
              <th className="py-3 px-4 border">Salary</th>
              <th className="py-3 px-4 border">Department</th>
              <th className="py-3 px-4 border" colSpan={2}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((employee, index) => (
              <tr 
                key={employee.id} 
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="py-2 px-4 border">{employee.id}</td>
                <td className="py-2 px-4 border">{employee.empname}</td>
                <td className="py-2 px-4 border">{employee.empage}</td>
                <td className="py-2 px-4 border">${employee.empsalary}</td>
                <td className="py-2 px-4 border">{employee.empdept}</td>
                <td className="py-2 px-4 border">
                  <Link to={`/edit/${employee.id}`}>Edit</Link>
                </td>
                <td className="py-2 px-4 border">delete</td>
              </tr>
            ))}
          </tbody>

        </table>
        
      </div>
    </div>
  );
}