import axios from 'axios';

export const getFormByUserId = async id => {
  try {
    const rta = axios.get(`/adoptions?applicant=${id}`);
    return rta;
  } catch (error) {
    console.log(error);
  }
};
