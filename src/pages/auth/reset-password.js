import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import ResetPassword from "@/components/resetPasswordForm";
import Head from "next/head";
import Grid from "@mui/material/Grid2";
import AuthFooter from "@/components/AuthFooter";

const resetPassword = () => {
  return (
    <>
      <Head>
        <title>reset Password</title>
      </Head>
      <Grid container sx={{ bgcolor: "#ffffff" }}>
        {/* background image */}
        <Grid item="true" size={{ xs: 0, md: 6.5, lg: 7.5 }}>
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
              priority={true}
            />
          </Box>
        </Grid>
        {/* sign in form */}
        <Grid
          item="true"
          size={{ xs: 12, md: 5.5, lg: 4.5 }}
          display="flex"
          justifyContent="center"
        >
          <ResetPassword />
        </Grid>
      </Grid>
      <AuthFooter show={true} width="60%" />
    </>
  );
};

export default resetPassword;
