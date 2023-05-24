import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  token: (localStorage.getItem("token") !== 'undefined') ? JSON.parse(localStorage.getItem("token")) : null,
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        token: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        token: null,
      };
    }
    default:
      return state;
  }
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(state.token));
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ token: state.token, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
