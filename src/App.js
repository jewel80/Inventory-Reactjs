import './App.css';
import {useContext} from "react";
import {ThemeContext} from "./context/ThemeContext";
import RouterProvider from "./routes/RouterProvider";
function App() {
  const { currentTheme } = useContext(ThemeContext)

  return (
    <div id={`${currentTheme}`}>
      <RouterProvider />
    </div>
  );
}

export default App;
