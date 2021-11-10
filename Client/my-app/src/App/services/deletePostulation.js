import axios from 'axios';

export const deletePostulation = async id => {
  try {
    const rta = await axios.delete(`/adoptions/${id}`);
    return rta;
  } catch (error) {
    console.log(error);
  }
};
