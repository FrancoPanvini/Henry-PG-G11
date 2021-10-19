//import prueba from './debug'

const initialState = {
  petsAdop: [],
  user: {},
  shelters: {},
  isLogged: false,
  countries: [],
  provinces: [],
  cities: [],
  lostPets: [],
  active: 'Mis Datos',
  userData: [],
  userPets: [],
  events: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_PETS':
      return {
        ...state,
        petsAdop: action.payload.data,
      };

    case 'POST_PETS':
      return {
        ...state,
      };

    case 'GET_PETS_FILTERED':
      return {
        ...state,
        petsAdop: action.payload.data,
      };
    case 'POST_USER':
      return {
        ...state,
      };

    case 'SET_USER':
      return {
        ...state,
        user: {
          mail: action.payload.mail,
          id: action.payload.id,
          type: action.payload.UsersTypeId,
        },
        isLogged: true,
      };

    case 'GET_SHELTERS':
      return {
        ...state,
        shelters: action.payload.data,
      };
    case 'GET_SHELTERS_FILTERED':
      return {
        ...state,
        shelters: action.payload.data,
      };

    case 'LOGIN':
      return {
        ...state,
      };

    case 'GET_COUNTRIES':
      return { ...state, countries: action.payload };

    case 'GET_PROVINCES':
      return { ...state, provinces: action.payload };

    case 'GET_CITIES':
      return { ...state, cities: action.payload };

    case 'LOG_OUT_USER':
      return {
        ...state,
        user: {},
        isLogged: false,
      };

    case 'GET_LOST_PETS':
      return { ...state, lostPets: action.payload.data };

    case 'GET_LOST_PETS_FILTERED':
      return { ...state, lostPets: action.payload.data };

    case 'SET_ACTIVE':
      return {
        ...state,
        active: action.payload,
      };
    case 'INITIAL_USER':
      return {
        ...state,
        userData: action.payload.data,
      };
    case 'GET_EVENTS':
      return { ...state, events: action.payload };

    default:
      return state;
  }
}

export default rootReducer;
