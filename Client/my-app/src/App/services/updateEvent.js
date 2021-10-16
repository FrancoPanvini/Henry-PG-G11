import axios from 'axios';

export const updateEvent = async (id, dataEdit ) => {
  try {
    const rta = await axios.put(`/events/${id}`, dataEdit);
    return rta;
  } catch (error) {
    console.log(error);
  }
};
