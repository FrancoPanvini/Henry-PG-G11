import axios from 'axios';

export const getLostPetDetail = async id => {
  try {
    const rta = await axios.get(`/lostpets/${id}`);
    return rta;
  } catch (error) {
    console.log(error);
  }
};
