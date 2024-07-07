import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  console.log(cart)

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Cart</h1>
      <Row>
        {cart.items.map(item => (
          <Col key={item.dish._id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{item.dish.name}</Card.Title>
                <Card.Text>{item.dish.description}</Card.Text>
                <Card.Text>Price: ${item.dish.price}</Card.Text>
                <Button variant="danger" onClick={() => removeFromCart(item.dish._id)}>Remove</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {cart.items.length > 0 && (
        <div className="text-center mt-4">
          <h4>Total: ${cart.total ? cart.total.toFixed(2) : '0.00'}</h4>
          <Button onClick={handlePlaceOrder}>Place Order</Button>
        </div>
      )}
      {cart.items.length === 0 && (
        <div className="text-center mt-4">
          <h4>Your cart is empty</h4>
          <Button onClick={() => navigate('/')}>Go to Home</Button>
        </div>
      )}
    </Container>
  );
};

export default Cart;
