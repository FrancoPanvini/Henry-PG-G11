import axios from 'axios';

export default () => (dispatch) => {
  dispatch({
    type: "getPetsLoading",
  });

  axios
    .get('http://adogtameapi.herokuapp.com/pets/')
    .then((res) => {
      dispatch({
        type: "getPetsSuccess",
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "getPetsFail",
        payload: err.response
          ? err.response.data
          : {error: 'Something went wrong, try again'},
      });
    });
};