import axios from 'axios';

export const getEventDetail = async id => {
  try {
    const rta = await axios.get(`/events/${id}`);
    return rta;
  } catch (error) {
    console.log(error);
  }
};
