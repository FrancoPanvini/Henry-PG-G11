import axios from 'axios';

export const postAdoption = async (input) => {
  try {
    const rta = await axios.post('/adoptions', input);
    return rta;
  } catch (error) {
    console.log(error);
  }
};
