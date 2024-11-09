import React from "react";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import Image from "next/image";
import Box from "@mui/material/Box";
import SetPasswordForm from "@/components/SetPasswordForm";
import Head from "next/head";
import Footer from '@/components/Footer'

const SetPassword = () => {
  return (
    <>
      <Head>
        <title>Set Password</title>
      </Head>
      <Box
        component="div"
        sx={{
          width: "100%",
          display: "flex",
        }}
      >
        <Box
          component="div"
          sx={{
            height: "100vh",
            width: "62.5%",
            position: "relative",
          }}
        >
          <Image
            src="/signBackground.jpg"
            fill
            alt="background"
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            width: "37%",
          }}
        >
          <SetPasswordForm />
        </Box>
      </Box>
      <Footer width="60%" />
    </>
  )
}

export default SetPassword