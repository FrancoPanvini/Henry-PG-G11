//import prueba from './debug'

const initialState = {
  petsAdop: [],
  petsHome: [],
  user: {},
  shelters: {},
  isLogged: false,
  countries: [],
  provinces: [],
  cities: [],
  lostPets: [],
  lostPetsHome: [],
  active: 'Mis Datos',
  userData: [],
  userPets: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PETS":
      return {
        ...state,
        petsAdop: action.payload.data,
      };
    
    case "GET_PETS_HOME":
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

    case "GET_SHELTERS":
      return{
        ...state,
        shelters: action.payload.data
      }  
    case "GET_SHELTERS_FILTERED":
        return {
          ...state,
          shelters: action.payload.data,
      };

    case "LOGIN":
      return {
        ...state,
      };

    case "GET_COUNTRIES":
      return { ...state, countries: action.payload };

    case "GET_PROVINCES":
      return { ...state, provinces: action.payload };

    case "GET_CITIES":
      return { ...state, cities: action.payload.data };

    case "LOG_OUT_USER":
      return {
        ...state,
        user: {},
        isLogged:  false
      }
    
    case "GET_LOST_PETS":
      return {...state, lostPets:action.payload.data}

    case "GET_LOST_PETS_FILTERED":
      return {
        ...state,
        lostPets: action.payload.data,
      };

    case "GET_LOST_PETS_HOME":
      return {
        ...state,
        lostPets: action.payload.data,
      };

    case "SET_ACTIVE":
      return{
        ...state,
        active: action.payload
      }
    case "INITIAL_USER":
      return{
        ...state,
        userData: action.payload.data
      }
    case "GET_USER_PETS":
      return{
        ...state,
        userPets: action.payload.data
      }

    default:
      return state;
  }
}

export default rootReducer;
