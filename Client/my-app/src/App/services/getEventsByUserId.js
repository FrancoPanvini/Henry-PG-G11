import axios from 'axios';

export const getEventsByUserId = async id => {
  try {
    const rta = axios.get(`/events?organizer=${id}`);
    return rta;
  } catch (error) {
    console.log(error);
  }
};
