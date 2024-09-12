import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import CLogin from './components/cLogin';
import ReadOneHome  from './pages/ReadOneHome';
 
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

import ShowPkg from './pages/Pkgs/ShowPkg';
import CreatePkg from './pages/Pkgs/CreatePkg';
import DeletePkg from './pages/Pkgs/DeletePkg';
import EditPkg from './pages/Pkgs/EditPkg';
import ReadOnePkg from './pages/Pkgs/ReadOnePkg';


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
 

import CreateCustomer from './pages/Customer/CreateCustomer';
import DeleteCustomer from './pages/Customer/DeleteCustomer';
import EditCustomer from './pages/Customer/EditCustomer';
import ShowAllCustomers from './pages/Customer/ShowAllCustomers';
import ReadOneCustomer from './pages/Customer/ReadOneCustomer';

import CreateStore from './pages/StoreM/CreateStore';
import DeleteStore from './pages/StoreM/DeleteStore';
import EditStore from './pages/StoreM/EditStore';
import ShowStore from './pages/StoreM/ShowStore';

import CreateCard from './pages/Card/CreateCard';




import ItemCard from './pages/Cart/ItemCard';
import Main from './pages/Cart/Main';
import ItemDis from './pages/Cart/ItemDis';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Cart/Checkout';
import MyOrder from './pages/Cart/MyOrder';





import CreateEmployeeAttendance from './pages/EmployeeAttendence/CreateEmployeeAttendence';
import DeleteEmployeeAttendance from './pages/EmployeeAttendence/DeleteEmployeeAttendence';
import EditEmployeeAttendance from './pages/EmployeeAttendence/EditEmployeeAttendence';
import ShowEmployeeAttendence from './pages/EmployeeAttendence/ShowEmployeeAttendence';






import ItemCard from './pages/Cart/ItemCard';
import Main from './pages/Cart/Main';
import ItemDis from './pages/Cart/ItemDis';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Cart/Checkout';
import MyOrder from './pages/Cart/MyOrder';


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

      <Route path='/pkg/allPkg' element={<ShowPkg />}></Route>
      <Route path='/pkg/create' element={<CreatePkg />}></Route>
      <Route path='/pkg/delete/:id' element={<DeletePkg />}></Route>
      <Route path='/pkg/edit/:id' element={<EditPkg />}></Route>
      <Route path='/pkg/details/:id' element={<ReadOnePkg />}></Route>
  



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

      
      <Route path='/customers/create' element={<CreateCustomer />}></Route>
      <Route path='/customers/delete/:id' element={<DeleteCustomer />}></Route>
      <Route path='/customers/edit/:id' element={<EditCustomer />}></Route>
      <Route path='/customers/:id' element={<ReadOneCustomer />}></Route>
      <Route path='/customers/' element={<ShowAllCustomers />}></Route>


      <Route path='/card' element={<CreateCard />}></Route>


      <Route path='/cLogin' element={<CLogin />}></Route>'
      <Route path='/ReadOneHome/:id' element={<ReadOneHome />}></Route> 
      <Route path='/card/create' element={<CreateCard />}></Route>



       <Route path='/store/create' element={<CreateStore />}></Route>
      <Route path='/store/delete/:id' element={<DeleteStore />}></Route>
      <Route path='/store/edit/:id' element={<EditStore />}></Route>
      <Route path='/store/' element={<ShowStore />}></Route>
     

     <Route path='/itemcard/create' element={<ItemCard />}></Route>
     <Route path='/cart/main' element={<Main />}></Route>
     <Route path='/itemdis/:id' element={<ItemDis />}></Route>
      <Route path='/cart' element={<Cart />}></Route>
    <Route path='/checkout' element={<Checkout />}></Route>

    <Route path='/my-orders' element={<MyOrder />}></Route>

      <Route path='/employeeattendence/create' element={<CreateEmployeeAttendance />}></Route>
      <Route path='/employeeattendence/delete/:id' element={<DeleteEmployeeAttendance />}></Route>
      <Route path='/employeeattendence/edit/:id' element={<EditEmployeeAttendance />}></Route>
      <Route path='/employeeattendence/allEmployeeAttendence' element={<ShowEmployeeAttendence />}></Route>


    </Routes>
  )
}

export default App