//import prueba from './debug'

const initialState = {
    petsAdop : [],
    petsFilter: [],
  };


function rootReducer(state = initialState, action) {

    switch(action.type){
      case "GET_PETS": 
        return {
          ...state,
          petsAdop : action.payload.data.rows
        }
      default: return state;
    }
}
  
export default rootReducer;