import axios from 'axios';

const API_URL = 'https://flavourfleet-server.onrender.com/api/restaurants';

export const getRestaurants = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};
