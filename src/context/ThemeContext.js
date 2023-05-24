import {createContext, useEffect, useReducer} from "react";

const INITIAL_STATE = {
  currentTheme: JSON.parse(localStorage.getItem("theme")) || "dark",
}

const ThemeReducer = (state, action) => {
  switch (action.type) {
    case "dark": {
      return {
        currentTheme: 'dark'
      }
    }
    default:
      return state;
  }
}

export const ThemeContext = createContext(INITIAL_STATE);

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ThemeReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(state.currentTheme))
  }, [state.currentTheme]);

  return (
    <ThemeContext.Provider
      value={{ currentTheme: state.currentTheme, dispatch}}
    >
      {children}
    </ThemeContext.Provider>
  )
}