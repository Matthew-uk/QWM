import axios from 'axios';

export const fetchUserData = async () => {
  const response = await axios.get('/api/getUser', { withCredentials: true });
  return response.data;
};

export const fetchAdminData = async () => {
  const response = await axios.get('/api/getAdmin', { withCredentials: true });
  return response.data;
};
