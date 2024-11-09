import React from "react";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import Image from "next/image";
import Box from "@mui/material/Box";
import SignInForm from "@/components/SignInForm";
import Head from "next/head";
import Divider from '@mui/material/Divider';
import { Typography } from "@mui/material";


const SignIn = () => {
  return (
    <>
      <Head>
        <title>Sign in</title>
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
            width: "60%",
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
            width: "40%",
          }}
        >

          <SignInForm />
        </Box>
      </Box>
      <Box
        bottom={10}
        component="footer"
        sx={{
          width: "100%",
          color: "#D9D9D9",
          position: "fixed"
        }}>
        <Divider sx={{
          bgcolor: "#D9D9D9",
          mb: "20px"
        }}
        />

        <Box component="div"
          sx={{
            width: "60%",

            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <Typography>
            Copyright © ITM Development | Contact Book | 2022
          </Typography>
          <Typography>
            Privacy Policy - Terms & Conditions
          </Typography>
        </Box>

      </Box>
    </>
  );
};

export default SignIn;
