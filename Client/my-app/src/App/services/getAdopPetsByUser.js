import axios from 'axios';

export const getAdopPetsByUser = async id => {
  try {
    const rta = await axios.get(`/pets?owner=${id}`);
    return rta.data.rows;
  } catch (error) {
    console.log(error);
  }
};
