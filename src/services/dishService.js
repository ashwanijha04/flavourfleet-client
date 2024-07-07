import axios from 'axios';

const API_URL = 'http://localhost:8081/api/restaurants';

// Fetch all dishes for a restaurant
export const getDishesByRestaurant = async (restaurantId) => {
  try {
    const response = await axios.get(`${API_URL}/${restaurantId}/dishes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dishes:', error);
    throw error;
  }
};

// Create a new dish for a restaurant
export const createDish = async (restaurantId, dishData) => {
  try {
    const response = await axios.post(`${API_URL}/${restaurantId}/dishes`, dishData);
    return response.data;
  } catch (error) {
    console.error('Error creating dish:', error);
    throw error;
  }
};

// Update a dish
export const updateDish = async (dishId, dishData) => {
  try {
    const response = await axios.put(`${API_URL}/dishes/${dishId}`, dishData);
    return response.data;
  } catch (error) {
    console.error('Error updating dish:', error);
    throw error;
  }
};

// Delete a dish
export const deleteDish = async (dishId) => {
  try {
    const response = await axios.delete(`${API_URL}/dishes/${dishId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting dish:', error);
    throw error;
  }
};
