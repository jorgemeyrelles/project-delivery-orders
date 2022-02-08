import React from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerProducts from './pages/customer/CustomerProducts';
import CustomerCheckout from './pages/customer/CustomerCheckout';
import CustomerOrders from './pages/customer/CustomerOrders';
import AdminForm from './pages/admin/AdminForm';
import DetailsOrder from './pages/customer/DetailsOrder';
import DetailsSellerOrder from './pages/seller/DetailsSellerOrder';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" replace /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/customer/products" element={ <CustomerProducts /> } />
      <Route exact path="/customer/checkout" element={ <CustomerCheckout /> } />
      <Route exact path="/customer/orders" element={ <CustomerOrders /> } />
      <Route exact path="/admin/manage" element={ <AdminForm /> } />
      <Route exact path="/customer/orders/:id" element={ <DetailsOrder /> } />
      <Route exact path="/seller/orders/:id" element={ <DetailsSellerOrder /> } />
      <Route exact path="/seller/orders" element={ <CustomerOrders /> } />
    </Routes>
  );
}

export default App;
