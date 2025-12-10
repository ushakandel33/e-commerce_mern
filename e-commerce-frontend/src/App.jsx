
import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Cart from './pages/Cart'
import AllProducts from './pages/AllProducts'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import ProductDetails from './pages/ProductDetails'
import useAuthUser from './hooks/useAuthUser.js'
import PageLoader from './components/PageLoader.jsx'
import Navbar from './components/Navbar.jsx'
import Checkout from './pages/checkout.jsx'
import OrderSuccess from './pages/OrderSuccess.jsx'
import MyOrders from './pages/MyOrders.jsx'

const App = () => {

const {authUser,isLoading} = useAuthUser()
const isAuthenticated = Boolean(authUser)
console.log(authUser);
const isadmin = authUser?.role==='admin'
console.log(isadmin)
console.log(isAuthenticated)
  if (isLoading) return <PageLoader/>;
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={isAuthenticated?<Home/>:<Navigate to={'/login'}/>} />
        <Route path="/products" element={isAuthenticated?<AllProducts/>:<Navigate to={'/login'}/>} />
        <Route path="/product/:id" element={isAuthenticated?<ProductDetails />:<Navigate to={'/login'}/>} />
        <Route path="/cart" element={isAuthenticated?<Cart/>:<Navigate to={'/login'}/>} />
        <Route path="/login" element={!isAuthenticated?<Login />:<Navigate to={'/'}/>} />
        <Route path="/register" element={!isAuthenticated?<Register />:<Navigate to={'/'}/>} />
        <Route path="/admin" element={isAuthenticated&&isadmin?<AdminDashboard />:<Navigate to={'/'}/>} />
        <Route path="/checkout" element={isAuthenticated?<Checkout />:<Navigate to={'/login'}/>} />
        <Route path="/order-success/:id" element={isAuthenticated?<OrderSuccess />:<Navigate to={'/login'}/>} />
        <Route path="/orders" element={isAuthenticated?<MyOrders />:<Navigate to={'/login'}/>} />
      </Routes>
    </div>
  )
}

export default App