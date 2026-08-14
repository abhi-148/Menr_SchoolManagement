import {
  createContext,
  useState,
  useEffect
} from "react";

export const AuthContext =
  createContext();


export const AuthProvider = ({
  children
}) => {

  // =========================================================
  // INITIAL AUTH STATE
  // =========================================================

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [role, setRole] = useState(
    localStorage.getItem("role")
  );

  const [schoolId, setSchoolId] =
    useState(
      localStorage.getItem("schoolId")
    );


  // Used to prevent PrivateRoute from
  // redirecting before auth state is ready.
  const [authLoading, setAuthLoading] =
    useState(true);


  const [isAuthenticated, setIsAuthenticated] =
    useState(
      Boolean(
        localStorage.getItem("token")
      )
    );


  // =========================================================
  // RESTORE AUTH STATE
  // =========================================================

  useEffect(() => {

    const storedToken =
      localStorage.getItem("token");

    const storedRole =
      localStorage.getItem("role");

    const storedSchoolId =
      localStorage.getItem("schoolId");


    setToken(storedToken);
    setRole(storedRole);
    setSchoolId(storedSchoolId);

    setIsAuthenticated(
      Boolean(storedToken)
    );

    setAuthLoading(false);

  }, []);


  // =========================================================
  // LOGIN
  // =========================================================

  const login = (
    newToken,
    newRole,
    newSchoolId
  ) => {

    localStorage.setItem(
      "token",
      newToken
    );

    localStorage.setItem(
      "role",
      newRole
    );


    // Store school ID only when available
    if (
      newSchoolId !== undefined &&
      newSchoolId !== null &&
      newSchoolId !== ""
    ) {

      localStorage.setItem(
        "schoolId",
        String(newSchoolId)
      );

    } else {

      localStorage.removeItem(
        "schoolId"
      );

    }


    setToken(newToken);
    setRole(newRole);

    setSchoolId(
      newSchoolId ?? null
    );

    setIsAuthenticated(true);

  };


  // =========================================================
  // LOGOUT
  // =========================================================

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

    localStorage.removeItem(
      "schoolId"
    );

    localStorage.removeItem(
      "user"
    );


    setToken(null);
    setRole(null);
    setSchoolId(null);

    setIsAuthenticated(false);

  };


  // =========================================================
  // CONTEXT
  // =========================================================

  return (

    <AuthContext.Provider
      value={{
        token,
        role,
        schoolId,
        isAuthenticated,
        authLoading,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};