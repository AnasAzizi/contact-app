import React from "react";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import Image from "next/image";
import Box from "@mui/material/Box";
import SignInForm from "@/components/SignInForm";
import Head from "next/head";
import Grid from "@mui/material/Grid2";
import AuthFooter from "@/components/AuthFooter";

const SignIn = () => {
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <Grid container sx={{ bgcolor: "#ffffff" }}>
        {/* background image */}
        <Grid item="true" size={{ xs: 0, md: 6, lg: 7.5 }}>
          <Box
            component="div"
            sx={{
              height: "100vh",
              position: "relative",
            }}
          >
            <Image
              src="/signBackground.jpg"
              alt="background"
              quality={100}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Grid>
        {/* sign in form */}
        <Grid
          item="true"
          size={{ xs: 9.5, md: 6, lg: 4.2 }}
          display="flex"
          justifyContent="center"
        >
          <SignInForm />
        </Grid>
      </Grid>
      <AuthFooter width="60%" show={true} />
    </>
  );
};

export default SignIn;
