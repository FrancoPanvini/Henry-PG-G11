import axios from "axios";

export const getLostPetsByUser = async id => {
  try {
    const rta = await axios.get(`/lostpets?owner=${id}`);
    return rta.data.rows;
  } catch (error) {
    console.log(error);
  }
};