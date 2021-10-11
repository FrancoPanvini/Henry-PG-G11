import axios from 'axios';

export const editPetsData = (dataEdit, id) => {
  return axios.put(`/pets/${id}`, dataEdit);
};
