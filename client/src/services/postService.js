import axios from 'axios';

const API_URL = 'http://localhost:4000/posts';

export const getPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${API_URL}`, postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    await axios.delete(`${API_URL}/${postId}`);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};