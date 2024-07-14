import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 
  'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Surat',
];

const Header = ({ onSearch }) => {
  const { isAuthenticated, logout } = useAuth();
  const [selectedCity, setSelectedCity] = useState('Select City');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);  // Call the onSearch function on each keystroke
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar" sticky="top">
      <Container>
        <Navbar.Brand href="/" className="brand-name">FlavourFleet</Navbar.Brand>
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
          <Nav.Link href="#about" className="nav-link">About</Nav.Link>
          <Nav.Link href="#contact" className="nav-link">Contact</Nav.Link>
          <Nav.Link as={Link} to="/cart" className="nav-link">Cart</Nav.Link>
          <Dropdown onSelect={(eventKey) => setSelectedCity(eventKey)} className="nav-item dropdown">
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
              {selectedCity}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {cities.map((city, index) => (
                <Dropdown.Item key={index} eventKey={city}>{city}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2 nav-item"
              value={query}
              onChange={handleSearchChange}
            />
          </Form>
          {isAuthenticated ? (
            <Button variant="outline-light" onClick={handleLogout} className="nav-link">Logout</Button>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
              <Nav.Link as={Link} to="/register" className="nav-link">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
