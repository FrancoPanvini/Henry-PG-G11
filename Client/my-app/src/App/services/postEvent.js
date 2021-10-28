import axios from 'axios';

export const postEvent = async event => {
  try {
    const rta = await axios.post('/events', event);
    return rta;
  } catch (error) {
    console.log(error);
  }
};
