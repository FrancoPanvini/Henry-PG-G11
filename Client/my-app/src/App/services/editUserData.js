import axios from 'axios';

export const editUserData = (id, dataEdit) => {
  return axios.put(`/users/${id}`, dataEdit);
};
