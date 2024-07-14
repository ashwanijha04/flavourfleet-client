import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal } from 'react-bootstrap';
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
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({
    name: '',
    description: '',
    price: '',
    restaurantId: ''
  });
  const [showDishModal, setShowDishModal] = useState(false);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('https://flavourfleet-server.onrender.com/api/restaurants');
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
      await axios.post('https://flavourfleet-server.onrender.com/api/restaurants', newRestaurant);
      setNewRestaurant({ name: '', address: '', cuisine: '', rating: '', imageUrl: '' });
      fetchRestaurants();
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  };

  const handleDeleteRestaurant = async (id) => {
    try {
      await axios.delete(`https://flavourfleet-server.onrender.com/api/restaurants/${id}`);
      fetchRestaurants();
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const handleSelectRestaurant = async (restaurant) => {
    setSelectedRestaurant(restaurant);
    fetchDishes(restaurant._id);
    setShowDishModal(true);
  };

  const fetchDishes = async (restaurantId) => {
    try {
      const response = await axios.get(`https://flavourfleet-server.onrender.com/api/restaurants/${restaurantId}/dishes`);
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const handleDishChange = (e) => {
    setNewDish({ ...newDish, [e.target.name]: e.target.value });
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://flavourfleet-server.onrender.com/api/restaurants/${selectedRestaurant._id}/dishes`, newDish);
      setNewDish({ name: '', description: '', price: '', restaurantId: '' });
      fetchDishes(selectedRestaurant._id);
    } catch (error) {
      console.error('Error adding dish:', error);
    }
  };

  const handleDeleteDish = async (dishId) => {
    try {
      await axios.delete(`https://flavourfleet-server.onrender.com/api/restaurants/${selectedRestaurant._id}/dishes/${dishId}`);
      fetchDishes(selectedRestaurant._id);
    } catch (error) {
      console.error('Error deleting dish:', error);
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
                      className="mr-2"
                      size="sm"
                    >
                      Delete
                    </Button>
                    <Button
                      variant="info"
                      onClick={() => handleSelectRestaurant(restaurant)}
                      size="sm"
                    >
                      Manage Dishes
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal for managing dishes */}
      <Modal show={showDishModal} onHide={() => setShowDishModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Manage Dishes for {selectedRestaurant && selectedRestaurant.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h3>Add New Dish</h3>
              <Form onSubmit={handleAddDish}>
                <Form.Group controlId="dishName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newDish.name}
                    onChange={handleDishChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={newDish.description}
                    onChange={handleDishChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={newDish.price}
                    onChange={handleDishChange}
                    step="0.01"
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Add Dish
                </Button>
              </Form>
            </Col>
            <Col md={6}>
              <h3>Dishes</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dishes.map((dish) => (
                    <tr key={dish._id}>
                      <td>{dish.name}</td>
                      <td>{dish.description}</td>
                      <td>${dish.price.toFixed(2)}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteDish(dish._id)}
                          size="sm"
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDishModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminPanel;
