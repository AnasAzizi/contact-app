import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { CurrentUser } from "@/pages/api/user";
import Cookies from "js-cookie";

export const CurrentUserContext = createContext({
  currentUser: {},
  setCurrentUser: () => {},
  userIsLoading: false,
  setToken: () => {},
  token: null,
});

export const useCurrentUser = () => useContext(CurrentUserContext);

export default function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState(() => {
    return Cookies.get("jwtToken") || null;
  });

  useEffect(() => {
    if (token) {
      Cookies.set("jwtToken", token, { expires: 1, path: "/" });
    } else {
      Cookies.remove("jwtToken", { path: "/" });
    }
  }, [token]);

  const { data: currentUserData, isLoading: userIsLoading } = useQuery({
    queryKey: ["currentuser", token],
    queryFn: () => (token ? CurrentUser() : null),
    enabled: !!token,
  });

  useEffect(() => {
    if (currentUserData) {
      setCurrentUser(currentUserData);
      Cookies.set("userRole", currentUserData.role, { expires: 1, path: "/" });
    }
  }, [currentUserData]);

  const contextValue = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      userIsLoading,
      setToken,
      token,
    }),
    [currentUser, userIsLoading, token]
  );

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  );
}
