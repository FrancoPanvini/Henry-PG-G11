const contacts = (state, {type, payload}) => {
    switch (type) {
      case "EDIT_CONTACT_LOADING": {
        return {
          ...state,
          createContact: {
            ...state.createContact,
            loading: true,
            error: null,
          },
        };
      }
  
      case "EDIT_CONTACT_SUCCESS": {
        return {
          ...state,
          createContact: {
            ...state.createContact,
            loading: false,
            error: null,
          },
  
          getContacts: {
            ...state.getContacts,
            loading: false,
            data: state.getContacts.data.map((item) => {
              if (item.id === payload.id) {
                return payload;
              } else {
                return item;
              }
            }),
            error: null,
          },
        };
      }
  
      case "EDIT_CONTACT_FAIL": {
        return {
          ...state,
          createContact: {
            ...state.createContact,
            loading: false,
            error: null,
          },
        };
      }
  
      case "DELETE_CONTACT_LOADING": {
        return {
          ...state,
          deleteContact: {
            ...state.deleteContact,
            loading: true,
            error: null,
          },
        };
      }
  
      case "DELETE_CONTACT_SUCCESS": {
        return {
          ...state,
          deleteContact: {
            ...state.deleteContact,
            loading: false,
            error: null,
          },
  
          getContacts: {
            ...state.getContacts,
            loading: false,
            data: state.getContacts.data.filter((item) => item.id !== payload),
            error: null,
          },
        };
      }
  
      case "CREATE_CONTACT_FAIL":
        return {
          ...state,
          createContact: {
            ...state.createContact,
            loading: false,
            error: null,
          },
        };
      case "CREATE_CONTACT_LOADING":
        return {
          ...state,
          createContact: {
            ...state.createContact,
            loading: true,
            error: null,
          },
        };
      case "CREATE_CONTACT_SUCCESS":
        return {
          ...state,
          createContact: {
            ...state.createContact,
            loading: false,
            error: null,
            data: payload,
          },
  
          getContacts: {
            ...state.getContacts,
            loading: false,
            data: [payload, ...state.getContacts.data],
            error: null,
          },
        };
  
      case "CREATE_CONTACT_FAIL":
        return {
          ...state,
          createContact: {
            ...state.createContact,
            loading: false,
            error: payload,
          },
        };
  
      case "getPetsLoading":
        return {
          ...state,
          getContacts: {
            ...state.getContacts,
            loading: true,
            error: null,
          },
        };
  
      case "getPetsSuccess":
        return {
          ...state,
          getContacts: {
            ...state.getContacts,
            loading: false,
            data: payload,
            error: null,
          },
        };
  
      case "getPetsFail":
        return {
          ...state,
          getContacts: {
            ...state.getContacts,
            loading: false,
            error: payload,
          },
        };
  
      default:
        return state;
    }
  };
  
  export default contacts;