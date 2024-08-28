import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'

import ShowEmployee from './pages/Employee/ShowEmployee';
import CreateEmployee from './pages/Employee/CreateEmployee';
import DeleteEmployee from './pages/Employee/DeleteEmployee';
import EditEmployee from './pages/Employee/EditEmployee';
import ReadOneEmployee from './pages/Employee/ReadOneEmployee';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>


      <Route path='/employees/allEmployee' element={<ShowEmployee />}></Route>
      <Route path='/employees/create' element={<CreateEmployee />}></Route>
      <Route path='/employees/delete/:id' element={<DeleteEmployee />}></Route>
      <Route path='/employees/edit/:id' element={<EditEmployee />}></Route>
      <Route path='/employees/details/:id' element={<ReadOneEmployee />}></Route>
        

    </Routes>
  )
}

export default App