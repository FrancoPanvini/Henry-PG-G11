//import prueba from './debug'

const initialState = {
    petsAdop : [],
    user: {},
    isLogged: false
  };


function rootReducer(state = initialState, action) {
  switch(action.type){
    case "GET_PETS": 
        return {
          ...state,
          petsAdop : action.payload.data
        };

    case "GET_PETS_FILTERED":
      return {
        ...state,
        petsAdop : action.payload.data
      }
    case "POST_USER":
        return{
          ...state
        };

    case "SET_USER":
        return{
          ...state,
          user :{
            mail: action.payload.mail,
            id: action.payload.id
          },
          isLogged:true
        }
        case "LOGIN":
          return{
            ...state
          };
        default:
          return state

          
      
      }
  }
  
export default rootReducer;