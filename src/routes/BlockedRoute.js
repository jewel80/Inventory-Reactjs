import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Navigate} from "react-router-dom";

const BlockedRoute = ({ children }) => {
  const {token} = useContext(AuthContext)

  if(token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default BlockedRoute