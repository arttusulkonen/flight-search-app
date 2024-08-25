import axios from 'axios';

const API_KEY = process.env.REACT_APP_AMADEUS_API_KEY;
const API_SECRET = process.env.REACT_APP_AMADEUS_API_SECRET;

// Function to retrieve the token
export const getToken = async () => {
  try {
    const response = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      new URLSearchParams({
        'grant_type': 'client_credentials',
        'client_id': API_KEY,
        'client_secret': API_SECRET
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );    
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching token:', error.response ? error.response.data : error);
    throw error;
  }
};

// Function to search flight offers
export const searchFlights = async (originLocationCode, destinationLocationCode, departureDate, returnDate, directFlight, adults, max) => {
  const token = await getToken();

  try {
    const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        originLocationCode,
        destinationLocationCode,
        departureDate,
        returnDate,
        nonStop: directFlight,
        adults,
        max
      }
    });

    return response.data;

  } catch (error) {
    console.error('Error fetching flight offers:', error.response ? error.response.data : error);
    throw error;
  }
};
