import axios from 'axios';
import jwt from "jsonwebtoken"
/* import { setUser } from '../redux/actions'; */


export const getPetsAdop = () => {
    return function(dispatch) {
        axios.get(`http://localhost:3001/pets?adopted=false`)
         .then(data => {
           dispatch({ type: "GET_PETS", payload: data });
         });
     };
}

export const getPetsAdopHome = () => {
    return function(dispatch) {
        axios.get(`http://localhost:3001/pets?adopted=false&paglimit=6&pagnumber=1`)
         .then(data => {
           dispatch({ type: "GET_PETS_HOME", payload: data });
         });
     };
}


export const getPetsAdopFilter = (filters) => {
    let url = "http://localhost:3001/pets?adopted=false"
    let keys = Object.keys(filters);
    let values = Object.values(filters);

    for (let i = 0; i < keys.length; i++) {
      url = url + '&' + keys[i] + "=" + values[i];
    }

    return function(dispatch) {
        axios.get(url)
         .then(data => {
           dispatch({ type: "GET_PETS_FILTERED", payload: data });
         });
     };
}

export const getPetAdopDetail = (id) => {
    return function(dispatch) {
        axios.get(`http://localhost:3001/pets/${id}`)
         .then(data => {
           dispatch({ type: "GET_PET_DETAIL", payload: data });
         });
     };
}

export const editPetsData = (dataEdit, id) => {
    return axios.put(`http://localhost:3001/pets/${id}`, dataEdit); 
}

export const getShelters = () => {
  return function(dispatch) {
    axios.get(`http://localhost:3001/users?type=r`)
     .then(data => {
       dispatch({ type: "GET_SHELTERS", payload: data });
     });
 };
}

export const getSheltersFilter = (filters) => {
  let url = "http://localhost:3001/users?type=r"
  let keys = Object.keys(filters);
  let values = Object.values(filters);

  for (let i = 0; i < keys.length; i++) {
    url = url + '&' + keys[i] + "=" + values[i];
  }

  return function(dispatch) {
      axios.get(url)
       .then(data => {
         dispatch({ type: "GET_SHELTERS_FILTERED", payload: data });
       });
   };
}

export const getEvents = () => {

}

export const getAllPets = () => {

}


export function postUsers(payload) {
    // console.log(payload)
     return async function (dispatch){
         const response = await axios.post("users/", payload)
         console.log(response);
         return response;
     }
     
 }

 export async function postPets(payload) {
  // console.log(payload){
       const response = await axios.post("http://localhost:3001/pets", payload)
       console.log(response);
       return response;
}

export function setUser(user) {
    return async dispatch => {
        dispatch({
            type: "SET_USER",
            payload: user,
        })
        localStorage.setItem('userId', user.id)
        localStorage.setItem('userCityid', user.CityId); // ← OJO que ""CityId"" está con mayúscula acá, pero en minúscula en la DB !!! REVISAR!!!!
    }
}
export function logInUsers(payload) {
    // console.log(payload)
     return async function (dispatch){
         const response = await axios.post("login/", payload).then((res) => {
            if(res.data.message) {
              alert("error1")
            }else{
              const token = res.data
              const user = jwt.decode(token)
              localStorage.setItem("token", token)
              dispatch(setUser(user))
              axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
            }
          }).catch ((err) => {
            alert(`${err}`)
          })
         console.log(response);
         return response;
     }
     
}

export const getCountries = () => {
  return function(dispatch) {
      axios.get("http://localhost:3001/countries")
       .then(data => {
         dispatch({ type: "GET_COUNTRIES", payload: data });
       });
   };
}

export const getProvinces = () => {
  return function(dispatch) {
      axios.get("http://localhost:3001/provinces")
       .then(data => {
         dispatch({ type: "GET_PROVINCES", payload: data });
       });
   };
}

export const getCities = () => {
  return function(dispatch) {
      axios.get("http://localhost:3001/cities")
       .then(data => {
         dispatch({ type: "GET_CITIES", payload: data });
       });
   };
}

export function logOutUser(){
  return dispatch => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('userCityid')
    dispatch({
      type: "LOG_OUT_USER"
    })
  }
}

export const getLostPets = () => {
  return function(dispatch) {
    axios.get(`http://localhost:3001/lostpets?found=false`)
     .then(data => {
       dispatch({ type: "GET_LOST_PETS", payload: data });
     });
 };
}

export const getLostPetsFilter = (filters) => {
  let url = "http://localhost:3001/lostpets?found=false"
    let keys = Object.keys(filters);
    let values = Object.values(filters);

    for (let i = 0; i < keys.length; i++) {
      url = url + '&' + keys[i] + "=" + values[i];
    }

    return function(dispatch) {
        axios.get(url)
         .then(data => {
           dispatch({ type: "GET_LOST_PETS_FILTERED", payload: data });
         });
     };
}

export const getLostPetsHome = () => {
  return function(dispatch) {
      axios.get(`http://localhost:3001/lostpets?found=false&paglimit=6&pagnumber=1`)
       .then(data => {
         dispatch({ type: "GET_LOST_PETS_HOME", payload: data });
       });
   };
}

