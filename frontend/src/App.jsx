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

import ShowInventory from './pages/Inventory/ShowInventory';
import CreateInventory from './pages/Inventory/CreateInventory';
import DeleteInventory from './pages/Inventory/DeleteInventory';
import EditInventory from './pages/Inventory/EditInventory';
import ReadOneInventory from './pages/Inventory/ReadOneInventory';

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

      <Route path='/inventories/allInventory' element={<ShowInventory />}></Route>
      <Route path='/inventories/create' element={<CreateInventory />}></Route>
      <Route path='/inventories/delete/:id' element={<DeleteInventory />}></Route>
      <Route path='/inventories/edit/:id' element={<EditInventory />}></Route>
      <Route path='/inventories/details/:id' element={<ReadOneInventory />}></Route>
      
    </Routes>
  )
}

export default App