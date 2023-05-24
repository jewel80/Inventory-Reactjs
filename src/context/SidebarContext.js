import {createContext, useEffect, useReducer} from "react";

const INITIAL_STATE = {
  sidebar: (localStorage.getItem("sidebar") !== 'undefined') ? JSON.parse(localStorage.getItem("sidebar")) : null,
};

const SidebarReducer = (state, action) => {
  switch (action.type) {
    case "SET_MENU": {
      return {
        sidebar: action.payload,
      }
    }
    case "DELETE_MENU": {
      return {
        sidebar: null
      }
    }
    default:
      return state;
  }
}

export const SidebarContext = createContext(INITIAL_STATE)

export const SidebarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SidebarReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("sidebar", JSON.stringify(state.sidebar));
  }, [state.sidebar]);

  return (
    <SidebarContext.Provider value={{sidebar: state.sidebar, dispatch}}>
      {children}
    </SidebarContext.Provider>
  )
}