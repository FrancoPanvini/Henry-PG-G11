import axios from "axios";

export const getPets = async () => {
    try{
        const res = await axios.get('/pets');
        return res=res.dat;

    } catch (err) {
        console.log(err)
    };
}


