import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";


function PrivateRoute({ children }) {

  const {
    token,
    isAuthenticated
  } = useContext(AuthContext);

  const location = useLocation();


  // =========================================================
  // NOT AUTHENTICATED
  // =========================================================

  if (
    !isAuthenticated ||
    !token
  ) {

    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location
        }}
      />
    );

  }


  // =========================================================
  // AUTHENTICATED
  // =========================================================

  return children;

}


export default PrivateRoute;