import axios from "axios";

export const getPetDetail = async id => {
  try {
    const rta = await axios.get(`/pets/${id}`);
    return rta;
  } catch (error) {
    console.log(error);
  }
};

