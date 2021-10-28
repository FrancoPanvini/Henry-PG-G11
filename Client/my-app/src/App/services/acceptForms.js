import axios from 'axios';

export const acceptForms = id => {
  return axios.put(`/adoptions/adopt/${id}`);
};
