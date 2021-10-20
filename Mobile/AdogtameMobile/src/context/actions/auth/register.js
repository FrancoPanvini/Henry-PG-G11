import axios from 'axios'

export default (newUser) => dispatch => {
    dispatch({
        type: "RegisterLoading"
    })
    axios.post('http://adogtameapi.herokuapp.com/users/', newUser)
        .then(res =>{
            dispatch({
                type: "RegisterSuccess",
                payload: res.data
            })
        })
        .catch(err=> {
            dispatch({
                type: "RegisterFailed",
                payload: err.response? err.response.data : {error:"Algo malió sal"}
            })
        })
}