import axios from 'axios';

const API_URL = 'http://localhost:4002/theme';

export const getTheme = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.theme;
  } catch (error) {
    console.error('Error fetching theme:', error);
    throw error;
  }
};

export const setTheme = async (theme) => {
  try {
    const response = await axios.post(API_URL, { theme });
    return response.data.theme;
  } catch (error) {
    console.error('Error setting theme:', error);
    throw error;
  }
};

export const themes = [
  'light',
  'dark',
  'highContrast',
  'solarizedLight',
  'solarizedDark',
  'monokai',
  'dracula'
];
