import axios from 'axios';

export const deleteEvent = async id => {
  try {
    const rta = await axios.delete(`/events/${id}`);
    return rta;
  } catch (error) {
    console.log(error);
  }
};
