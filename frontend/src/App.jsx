import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'

 
import ShowAppointment from './pages/Appointment/ShowAppointment';
import CreateAppointment from './pages/Appointment/CreateAppointment';
import DeleteAppointment from './pages/Appointment/DeleteAppointment';
import EditAppointment from './pages/Appointment/EditAppointment';
import ReadOneAppointment from './pages/Appointment/ReadOneAppointment';

import ShowService from './pages/SaloonService/ShowService';
import CreateService from './pages/SaloonService/CreateService';
import DeleteService from './pages/SaloonService/DeleteService';
import EditService from './pages/SaloonService/EditService';
import ReadOneService from './pages/SaloonService/ReadOneService';

import ShowPackage from './pages/SaloonPackage/ShowPackage';
import CreatePackage from './pages/SaloonPackage/CreatePackage';
import DeletePackage from './pages/SaloonPackage/DeletePackage';
import EditPackage from './pages/SaloonPackage/EditPackage';
import ReadOnePackage from './pages/SaloonPackage/ReadOnePackage';


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

 
      <Route path='/appointments/allAppointment' element={<ShowAppointment />}></Route>
      <Route path='/appointments/create' element={<CreateAppointment />}></Route>
      <Route path='/appointments/delete/:id' element={<DeleteAppointment />}></Route>
      <Route path='/appointments/edit/:id' element={<EditAppointment />}></Route>
      <Route path='/appointments/details/:id' element={<ReadOneAppointment />}></Route>

      <Route path='/services/allService' element={<ShowService />}></Route>
      <Route path='/services/create' element={<CreateService />}></Route>
      <Route path='/services/delete/:id' element={<DeleteService />}></Route>
      <Route path='/services/edit/:id' element={<EditService />}></Route>
      <Route path='/services/details/:id' element={<ReadOneService />}></Route>

      <Route path='/s_packages/allPackage' element={<ShowPackage />}></Route>
      <Route path='/s_packages/create' element={<CreatePackage />}></Route>
      <Route path='/s_packages/delete/:id' element={<DeletePackage />}></Route>
      <Route path='/s_packages/edit/:id' element={<EditPackage />}></Route>
      <Route path='/s_packages/details/:id' element={<ReadOnePackage />}></Route>
  



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