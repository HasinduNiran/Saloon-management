import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'

import ShowEmployee from './pages/Employee/ShowEmployee';
import CreateEmployee from './pages/Employee/CreateEmployee';
import DeleteEmployee from './pages/Employee/DeleteEmployee';
import EditEmployee from './pages/Employee/EditEmployee';
import ReadOneEmployee from './pages/Employee/ReadOneEmployee';

import ShowSupplier from './pages/Supplier/ShowSupplier';
import CreateSupplier from './pages/Supplier/CreateSupplier';
import DeleteSupplier from './pages/Supplier/DeleteSupplier';
import EditSupplier from './pages/Supplier/EditSupplier';
import ReadOneSupplier from './pages/Supplier/ReadOneSupplier';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>


      <Route path='/employees/allEmployee' element={<ShowEmployee />}></Route>
      <Route path='/employees/create' element={<CreateEmployee />}></Route>
      <Route path='/employees/delete/:id' element={<DeleteEmployee />}></Route>
      <Route path='/employees/edit/:id' element={<EditEmployee />}></Route>
      <Route path='/employees/details/:id' element={<ReadOneEmployee />}></Route>
        
      <Route path='/suppliers/allSupplier' element={<ShowSupplier />}></Route>
      <Route path='/suppliers/create' element={<CreateSupplier />}></Route>
      <Route path='/suppliers/delete/:id' element={<DeleteSupplier />}></Route>
      <Route path='/suppliers/edit/:id' element={<EditSupplier />}></Route>
      <Route path='/suppliers/details/:id' element={<ReadOneSupplier />}></Route>  

    </Routes>
  )
}

export default App