import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAdmin(decoded.isAdmin);
        setUserId(decoded?.id || "");
        console.log(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        setIsAdmin(false);
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        isLoggedIn,
        setIsLoggedIn,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
