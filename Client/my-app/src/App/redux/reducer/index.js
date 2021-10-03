//import prueba from './debug'

const initialState = {
  petsAdop: [],
  petsFilter: [],
  user: {},
  isLogged: false,
  countries: [],
  provinces: [],
  cities: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PETS":
      return {
        ...state,
        petsAdop: action.payload.data,
      };

    case "POST_PETS":
      return {
        ...state,
      };

    case "GET_PETS_FILTERED":
      return {
        ...state,
        petsAdop: action.payload.data,
      };
    case "POST_USER":
      return {
        ...state,
      };

    case "SET_USER":
      return {
        ...state,
        user: {
          mail: action.payload.mail,
          id: action.payload.id,
        },
        isLogged: true,
      };

    case "LOGIN":
      return {
        ...state,
      };

    case "GET_COUNTRIES":
      return { ...state, countries: action.payload.data };

    case "GET_PROVINCES":
      return { ...state, provinces: action.payload.data };

    case "GET_CITIES":
      return { ...state, cities: action.payload.data };

    case "LOG_OUT_USER":
      return {
        ...state,
        user: {},
        isLogged:  false
      }

    default:
      return state;
  }
}

export default rootReducer;
