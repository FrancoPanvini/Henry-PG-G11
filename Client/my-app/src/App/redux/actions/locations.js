import axios from 'axios';

export const getCountries = () => {
  return function (dispatch) {
    axios.get('/countries').then(response => {
      dispatch({ type: 'GET_COUNTRIES', payload: response.data });
    });
  };
};

export const getProvinces = countryId => {
  let url = '/provinces';
  if (countryId) url += `?countryId=${countryId}`;
  return function (dispatch) {
    axios.get(url).then(response => {
      dispatch({ type: 'GET_PROVINCES', payload: response.data });
    });
  };
};

export const getCities = provinceId => {
  let url = '/cities';
  if (provinceId) url += `?provinceId=${provinceId}`;
  return function (dispatch) {
    axios.get(url).then(response => {
      dispatch({ type: 'GET_CITIES', payload: response.data });
    });
  };
};
