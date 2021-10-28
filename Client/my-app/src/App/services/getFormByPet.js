import axios from 'axios';

export const getFormByPet = async id => {
  try {
    const rta = axios.get(`/adoptions?pet=${id}`);
    return rta;
  } catch (error) {
    console.log(error);
  }
};
