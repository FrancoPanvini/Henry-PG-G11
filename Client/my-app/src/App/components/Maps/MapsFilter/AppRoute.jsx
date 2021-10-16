import axios from "axios";

export const getPets = async () => {
    try{
        const res = await axios.get('/pets');
        return res=res.dat;

    } catch (err) {
        console.log(err)
    };
}


/////////////////////////////////////////////////
/* 
import axios from 'axios';

export const getPets = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`/pets?adopted=false`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
     });

    return data.rows;
  } catch (error) {
    console.log(error);
  }
}; */