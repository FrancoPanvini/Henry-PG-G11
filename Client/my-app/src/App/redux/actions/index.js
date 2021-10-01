import axios from 'axios';
import jwt from "jsonwebtoken"
/* import { setUser } from '../redux/actions'; */


export const getPetsAdop = () => {
    return function(dispatch) {
        axios.get("http://localhost:3001/pets?adopted=false")
         .then(data => {
           dispatch({ type: "GET_PETS", payload: data });
         });
     };
}

export const getPetsAdopFilter = (filters) => {
    let url = "http://localhost:3001/pets?adopted=false"
    filters.forEach( f => {
        url.concat("&");
        url.concat(f);
    })

    return function(dispatch) {
        axios.get(url)
         .then(data => {
           dispatch({ type: "GET_PETS_FILTRED", payload: data });
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

export const getUser = () => {

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
export function setUser(user) {
    return async dispatch => {
        dispatch({
            type: "SET_USER",
            payload: user,
        })
        localStorage.setItem('userId', user.id)
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


