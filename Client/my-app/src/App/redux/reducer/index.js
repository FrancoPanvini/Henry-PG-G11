//import prueba from './debug'

const initialState = {
    prueba : [],
    user: {},
    isLogged: false
  };


function rootReducer(state = initialState, action) {

  switch(action.type){
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