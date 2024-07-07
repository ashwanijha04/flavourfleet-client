import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const AdminPanel = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    address: '',
    cuisine: '',
    rating: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleChange = (e) => {
    setNewRestaurant({ ...newRestaurant, [e.target.name]: e.target.value });
  };

  const handleAddRestaurant = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/restaurants', newRestaurant);
      setNewRestaurant({ name: '', address: '', cuisine: '', rating: '', imageUrl: '' });
      fetchRestaurants();
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  };

  const handleDeleteRestaurant = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/restaurants/${id}`);
      fetchRestaurants();
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Admin Panel</h1>
      <Row>
        <Col md={6}>
          <h2>Add New Restaurant</h2>
          <Form onSubmit={handleAddRestaurant}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newRestaurant.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={newRestaurant.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="cuisine">
              <Form.Label>Cuisine</Form.Label>
              <Form.Control
                type="text"
                name="cuisine"
                value={newRestaurant.cuisine}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                value={newRestaurant.rating}
                onChange={handleChange}
                step="0.1"
                required
              />
            </Form.Group>
            <Form.Group controlId="imageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={newRestaurant.imageUrl}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Add Restaurant
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h2>Restaurants</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Cuisine</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr key={restaurant._id}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.address}</td>
                  <td>{restaurant.cuisine}</td>
                  <td>{restaurant.rating}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteRestaurant(restaurant._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;
