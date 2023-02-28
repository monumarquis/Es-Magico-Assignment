import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import UserDashboard from '../Pages/UserDashboard'
import AdminDashboard from '../Pages/AdminDashboard'
import Privateroutes from '../Components/Privateroutes'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/user' element={<Privateroutes><UserDashboard /></Privateroutes>}></Route>
      <Route path='/admin' element={<Privateroutes><AdminDashboard /></Privateroutes>}></Route>
    </Routes>
  )
}

export default AllRoutes