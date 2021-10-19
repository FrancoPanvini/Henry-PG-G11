import axios from 'axios';

export const editLostPetsData = (dataEdit, id) => {
  return axios.put(`/lostpets/${id}`, dataEdit);
};
