import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.js';
import RestaurantList from './components/RestaurantList.js';
import DishList from './components/DishList.js';
import Cart from './components/Cart.js';
import AdminPanel from './components/AdminPanel.js';
import Login from './components/Login.js';
import Register from './components/Register.js'; // Add this import
import { CartProvider } from './contexts/CartContext.js';
import { AuthProvider } from './contexts/AuthContext.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header onSearch={setSearchQuery} />
          <main>
            <Routes>
              <Route path="/" element={<RestaurantList searchQuery={searchQuery} />} />
              <Route path="/restaurants/:restaurantId/dishes" element={<DishList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> {/* Add this route */}
            </Routes>
          </main>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
