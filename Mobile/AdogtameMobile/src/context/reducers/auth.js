const auth = (state, {type, payload}) => {
    switch (type) {
      case "LoginLoading":
      case "RegisterLoading":
        return {
          ...state,
          loading: true,
        };
  
      case "RegisterSuccess":
        return {
          ...state,
          loading: false,
          data: payload,
        };
  
      case "LoginSuccess":
        return {
          ...state,
          loading: false,
          data: payload,
          isLoggedIn: true,
        };
  
      case "LOGOUT_USER":
        return {
          ...state,
          loading: false,
          data: null,
          isLoggedIn: false,
        };
  
      case "RegisterFailed":
      case "LoginFailed":
        return {
          ...state,
          loading: false,
          error: payload,
        };
  
      case "CLEAR_AUTH_STATE":
        return {
          ...state,
          loading: false,
          data: null,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export default auth;