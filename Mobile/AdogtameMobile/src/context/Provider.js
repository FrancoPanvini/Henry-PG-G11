import React, {createContext, useReducer} from 'react';
import authInitialState from './initialStates/authState';
import contactsInitialState from './initialStates/contactState';
import auth from './reducers/auth';
import contacts from './reducers/contacts';


export const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
    const [authState, authDispatch] = useReducer(auth, authInitialState);
    const [contactsState, contactsDispatch] = useReducer(
      contacts,
      contactsInitialState,
    );
      /* console.log('auth',authState) */
      /* console.log('contac',contactsState) */
 
    return (
      <GlobalContext.Provider
        value={{authState, contactsState, authDispatch, contactsDispatch}}>
        {children}
      </GlobalContext.Provider>
    );
  };
  
  export default GlobalProvider;
