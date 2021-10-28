import axios from 'axios';
import jwt from 'jsonwebtoken';
import swal from 'sweetalert';

export const getPetsAdop = () => {
  return function (dispatch) {
    axios.get(`/pets?adopted=false`).then(data => {
      dispatch({ type: 'GET_PETS', payload: data });
    });
  };
};

export const getPetsAdopHome = () => {
  return function (dispatch) {
    axios.get(`/pets?adopted=false&paglimit=6&pagnumber=1`).then(data => {
      dispatch({ type: 'GET_PETS', payload: data });
    });
  };
};

export const getPetsAdopFilter = filters => {
  let url = '/pets?adopted=false';
  let keys = Object.keys(filters);
  let values = Object.values(filters);

  for (let i = 0; i < keys.length; i++) {
    url = url + '&' + keys[i] + '=' + values[i];
  }

  return function (dispatch) {
    axios.get(url).then(data => {
      dispatch({ type: 'GET_PETS_FILTERED', payload: data });
    });
  };
};

export const getPetAdopDetail = id => {
  return function (dispatch) {
    axios.get(`/pets/${id}`).then(data => {
      dispatch({ type: 'GET_PET_DETAIL', payload: data });
    });
  };
};

export const getLostPets = () => {
  return function (dispatch) {
    axios.get(`/lostpets?found=false`).then(data => {
      dispatch({ type: 'GET_LOST_PETS', payload: data });
    });
  };
};

export const getLostPetsHome = () => {
  return function (dispatch) {
    axios.get(`/lostpets?found=false&paglimit=6&pagnumber=1`).then(data => {
      dispatch({ type: 'GET_LOST_PETS', payload: data });
    });
  };
};

export const getLostPetsFilter = filters => {
  let url = '/lostpets?found=false';
  let keys = Object.keys(filters);
  let values = Object.values(filters);

  for (let i = 0; i < keys.length; i++) {
    url = url + '&' + keys[i] + '=' + values[i];
  }

  return function (dispatch) {
    axios.get(url).then(data => {
      dispatch({ type: 'GET_LOST_PETS_FILTERED', payload: data });
    });
  };
};

export const getShelters = () => {
  return function (dispatch) {
    axios.get(`/users?type=r`).then(data => {
      dispatch({ type: 'GET_SHELTERS', payload: data });
    });
  };
};

export const getSheltersFilter = filters => {
  let url = '/users?type=r';
  let keys = Object.keys(filters);
  let values = Object.values(filters);

  for (let i = 0; i < keys.length; i++) {
    url = url + '&' + keys[i] + '=' + values[i];
  }

  return function (dispatch) {
    axios.get(url).then(data => {
      dispatch({ type: 'GET_SHELTERS_FILTERED', payload: data });
    });
  };
};

export function postUsers(payload) {
  return async function (dispatch) {
    const response = await axios.post('users/', payload);
    dispatch(logInUsers(payload));

    return response;
  };
}

export async function postPets(payload) {
  const response = await axios.post('/pets', payload);

  return response;
}

export function setUser(user) {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      payload: user,
    });
    let name = user.name;
    let capitalize = name.charAt(0).toUpperCase() + name.slice(1);
    localStorage.setItem('userMail', user.mail);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('userName', capitalize);
    localStorage.setItem('userCityid', user.CityId);
  };
}
export function logInUsers(payload) {
  return async function (dispatch) {
    const response = await axios.post('login/', payload).then(res => {
      if (res.data.message) {
        swal({
          text: res.data.message,
          icon: 'error',
          timer: 4000,
        });
      } else {
        const token = res.data;
        const user = jwt.decode(token);
        localStorage.setItem('token', token);
        dispatch(setUser(user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        window.location.replace('/');
      }
    });
    return response;
  };
}

export function logOutUser() {
  return dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userCityid');
    dispatch({
      type: 'LOG_OUT_USER',
    });
  };
}

export const setActive = payload => {
  return function (dispatch) {
    dispatch({ type: 'SET_ACTIVE', payload });
  };
};

export const initialUser = userId => {
  return function (dispatch) {
    axios.get(`users/${userId}`).then(data => {
      dispatch({ type: 'INITIAL_USER', payload: data });
    });
  };
};

export const getEvents = () => {
  return function (dispatch) {
    axios.get(`/events`).then(data => {
      dispatch({ type: 'GET_EVENTS', payload: data.data.rows });
    });
  };
};

export const getEventsFilter = filters => {
  let url = '/events';
  let keys = Object.keys(filters);
  let values = Object.values(filters);

  for (let i = 0; i < keys.length; i++) {
    if (i === 0) {
      url = url + '?' + keys[i] + '=' + values[i];
    } else {
      url = url + '&' + keys[i] + '=' + values[i];
    }
  }

  return function (dispatch) {
    axios.get(url).then(data => {
      dispatch({ type: 'GET_EVENTS', payload: data.data.rows });
    });
  };
};
