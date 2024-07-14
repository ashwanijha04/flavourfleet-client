import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import RestaurantList from './components/RestaurantList';
import DishList from './components/DishList';
import Cart from './components/Cart';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import Register from './components/Register'; // Add this import
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
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
