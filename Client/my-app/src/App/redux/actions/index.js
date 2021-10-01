import axios from 'axios';

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