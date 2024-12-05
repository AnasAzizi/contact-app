"use client";

import { useState,useContext } from "react";
import { CurrnetUserContext } from "@/Context/Context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const TanstackProvider = ({ children }) => {
  const [queryClint] = useState(() => new QueryClient());
  const {token}=useContext(CurrnetUserContext)

  return (
    <QueryClientProvider client={queryClint}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default TanstackProvider;
