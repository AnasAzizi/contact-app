import React from "react";
import { useRouter } from "next/router";
import Footer from "./layouts/Footer";
import Navbar from "@/components/layouts/NavBar";
import { Box } from "@mui/material";
import TanstackProvider from "./providers/TanstackProvider";

export default function Layout({ children, footerProps }) {
  const router = useRouter();
  const { pathname } = router;
  const isAuthPage = pathname.includes("auth");

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {!isAuthPage && <Navbar />}
      <TanstackProvider>
        <Box component="main" flex="1">
          {children}
        </Box>
      </TanstackProvider>

      {!isAuthPage && <Footer {...footerProps} />}
    </Box>
  );
}
