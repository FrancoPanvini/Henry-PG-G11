import axios from 'axios'

export const getUserById = async (id) => {
    try{
       const rta = axios.get(`/users/${id}`);
       return rta;
    }catch(error){
        console.log(error);
    }
}