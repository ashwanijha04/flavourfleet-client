import React, { useState, useEffect } from 'react';
import { getRestaurants } from '../services/restaurantService';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './RestaurantList.css';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Restaurants</h1>
      <Row>
        {restaurants.map((restaurant) => (
          <Col key={restaurant._id} sm={12} md={6} lg={4} className="mb-4">
            <Card className="restaurant-card">
              <Card.Img variant="top" src={restaurant.imageUrl} alt={restaurant.name} />
              <Card.Body>
                <Card.Title>{restaurant.name}</Card.Title>
                <Card.Text>
                  <strong>Address:</strong> {restaurant.address}
                </Card.Text>
                <Card.Text>
                  <strong>Cuisine:</strong> {restaurant.cuisine}
                </Card.Text>
                <Card.Text>
                  <strong>Rating:</strong> {restaurant.rating}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RestaurantList;
