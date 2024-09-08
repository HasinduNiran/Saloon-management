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

      <Route path='/packages/allPackage' element={<ShowPackage />}></Route>
      <Route path='/packages/create' element={<CreatePackage />}></Route>
      <Route path='/packages/delete/:id' element={<DeletePackage />}></Route>
      <Route path='/packages/edit/:id' element={<EditPackage />}></Route>
      <Route path='/packages/details/:id' element={<ReadOnePackage />}></Route>
  

    </Routes>
  )
}

export default App