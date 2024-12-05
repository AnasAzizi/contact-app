import { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CurrentUser } from "@/pages/api/user";
import Cookies from 'js-cookie';

export const CurrnetUserContext = createContext({});

export default function CurrnetUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState(null);

    // from chatGPT
    useEffect(() => {
      const savedToken = Cookies.get('jwtToken');
      if (savedToken) {
        setToken(savedToken);
      }
    }, []);

  const {
    data: currentUserData,
    isLoading: userIsLoading,
  } = useQuery({
    queryKey: ["currentuser", token],
    queryFn: CurrentUser,
    enabled: token > "",
  });

  useEffect(() => {
    if (currentUserData) {
      setCurrentUser(currentUserData);
    }
  }, [currentUserData]);

  useEffect(() => {
    if (token) {
      // localStorage.setItem("jwtToken", token);
      Cookies.set("jwtToken", token, { expires: 7, path: '/' });
    } else {
      // localStorage.removeItem("jwtToken");
      Cookies.remove("jwtToken", { path: '/' });
    }
  }, [token]);

  return (
    <CurrnetUserContext.Provider
      value={{ currentUser,setCurrentUser, userIsLoading, setToken,token }}
    >
      {children}
    </CurrnetUserContext.Provider>
  );
}