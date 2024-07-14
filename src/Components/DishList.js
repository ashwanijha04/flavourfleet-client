import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { getDishesByRestaurant } from '../services/dishService';
import { useCart } from '../contexts/CartContext';

const DishList = () => {
  const { restaurantId } = useParams();
  const [dishes, setDishes] = useState([]);
  const { cart, addToCart, updateQuantity } = useCart();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const data = await getDishesByRestaurant(restaurantId);
        setDishes(data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, [restaurantId]);

  const getCartItem = (dishId) => {
    return cart.items.find(item => item.dish._id === dishId);
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Dishes</h1>
      <Row>
        {dishes.map(dish => (
          <Col key={dish._id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Text>{dish.description}</Card.Text>
                <Card.Text>Price: ${dish.price.toFixed(2)}</Card.Text>
                {getCartItem(dish._id) ? (
                  <InputGroup className="mb-3">
                    <Button
                      variant="outline-secondary"
                      onClick={() => updateQuantity(dish._id, getCartItem(dish._id).quantity - 1)}
                    >
                      -
                    </Button>
                    <FormControl
                      value={getCartItem(dish._id).quantity}
                      readOnly
                      className="text-center"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => updateQuantity(dish._id, getCartItem(dish._id).quantity + 1)}
                    >
                      +
                    </Button>
                  </InputGroup>
                ) : (
                  <Button onClick={() => addToCart(dish)}>Add to Cart</Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DishList;
