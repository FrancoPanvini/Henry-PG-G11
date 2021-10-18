import axios from 'axios';

export const setFoundPetLost = (id) => {
  return axios.put(`/lostpets/found/${id}`);
};