import React from "react";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Navbar from "@/components/NavBar";
import { Box } from "@mui/material";

export default function Layout({ children, footerProps }) {
  const router = useRouter();
  const { pathname } = router;

  console.log("router", router);

  const isAuthPage = pathname.includes("auth");

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {!isAuthPage && <Navbar />}

      <Box component="main" flex="1">
        {children}
      </Box>

      {!isAuthPage && <Footer {...footerProps} />}
    </Box>
  );
}
