import axios from 'axios';

export const deletePetLost = async id => {
  try {
    const rta = await axios.delete(`/lostpets/${id}`);
    return rta;
  } catch (error) {
    console.log(error);
  }
};
