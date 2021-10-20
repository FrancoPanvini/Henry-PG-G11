import axiosInstance from '../../../helpers/axiosinterceptos'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

export default (user) => dispatch => {
    dispatch({
        type: "LoginLoading"
    })
    axiosInstance
    .post('http://adogtameapi.herokuapp.com/login/', user)
        .then((res) => {
            if(res.data.message){
                
                dispatch({
                    type: "LoginFailed",
                    payload: err.response? "err.response.data" : {error:"Algo malió sal"}
                })
            }
            else{
                const token = res.data
                const user = jwt_decode(token)
                

                AsyncStorage.setItem('token', token);
                AsyncStorage.setItem('user', `${user.id}`);
                dispatch({
                    type: "LoginSuccess",
                    payload: res.data,
                });
            }
        })
        .catch(err=> {
            dispatch({
                type: "LoginFailed",
                payload: err.response? "err.response.data" : {error:"Algo malió sal"}
            })
        })
}