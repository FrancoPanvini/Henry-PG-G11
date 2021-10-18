import axios from 'axios'

export const resetPassword = async (input, url) => {
    /* let config = {
        headers: {
            reset: url
        } */
    
    try {
        const rta = await axios.post('/login/newpass', input, {headers: {reset: url}});
        return rta;
      } catch (error) {
        console.log(error);
      }
}