import axios from "axios";

export const getPetsByUser = async id => {
  try {
    const rta = await axios.get(`/pets?owner=${id}&adopted=false`);
    return rta.data.rows;
  } catch (error) {
    console.log(error);
  }
};