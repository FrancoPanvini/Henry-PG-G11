import axios from 'axios';

export const forgotPassword = async input => {
  return axios.post(`/login/forgot`, input);
};
