import axiosInstance from '../../../helpers/axiosinterceptos'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default () => (dispatch) => {
  AsyncStorage.removeItem('token');
  AsyncStorage.removeItem('user');
  dispatch({
    type: "Logout",
  });
};