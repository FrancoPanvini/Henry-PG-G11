import axios from "axios";


export const deletePet = async id => {
  try {
    const rta = await axios.delete(`/pets/${id}`);
    return rta;
  } catch (error) {
    console.log(error);
  }
};