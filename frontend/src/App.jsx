import Employee from '../src/components/Employee'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Create from './components/Create'
import Update from './components/Update'
export default function App() {


  return (          
       <BrowserRouter>
       <Routes>
        <Route path='/' element={<Employee />}/>
        <Route path='/create' element={<Create />}/>
        <Route path='/edit/:id' element={<Update />}/>
       </Routes>
    </BrowserRouter>

  )
}
