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

// Create the context
export const CurrentUserContext = createContext({
  currentUser: {},
  setCurrentUser: () => {},
  userIsLoading: false,
  setToken: () => {},
  token: null,
});

// Custom hook to use the context
export const useCurrentUser = () => useContext(CurrentUserContext);

export default function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState(() => {
    // Only get token from cookies once when the component is first mounted
    return Cookies.get("jwtToken") || null;
  });

  // Set token in cookies when it changes
  useEffect(() => {
    if (token) {
      Cookies.set("jwtToken", token, { expires: 1, path: "/" });
    } else {
      Cookies.remove("jwtToken", { path: "/" });
    }
  }, [token]);

  // Fetch user data when token is available
  const { data: currentUserData, isLoading: userIsLoading } = useQuery({
    queryKey: ["currentuser", token],
    queryFn: () => (token ? CurrentUser() : null),
    enabled: !!token,
  });

  // Update current user and set role cookie when user data is fetched
  useEffect(() => {
    if (currentUserData) {
      setCurrentUser(currentUserData);
      Cookies.set("userRole", currentUserData.role, { expires: 1, path: "/" });
    }
  }, [currentUserData]);

  // Memoize the context value to prevent unnecessary re-renders
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
