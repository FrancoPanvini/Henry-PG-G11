import axios from 'axios';

export const postLostPet = async pet => {
  try {
    const rta = await axios.post('/lostpets', pet);
    return rta;
  } catch (error) {
    console.log(error);
  }
};
