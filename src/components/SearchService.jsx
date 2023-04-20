import axios from 'axios';

const API_KEY = '35510757-d0f590ce383c890c04ecc88d8'

axios.defaults.baseURL = 'https://pixabay.com/api/'
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'horizontal',
  per_page: 12
}
export const getImages = async (query, page) => {
  const { data } = await axios.get(`search?query=${query}&page=${page}`);
  return data;
} 