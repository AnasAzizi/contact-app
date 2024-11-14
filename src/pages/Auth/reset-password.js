import React from "react";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import Image from "next/image";
import Box from "@mui/material/Box";
import ResetPassForm from "@/components/ResetPassForm";
import Head from "next/head";
import Grid from "@mui/material/Grid2";

const resetPassword = () => {
  return (
    <>
      <Head>
        <title>Reset password</title>
      </Head>
      <Grid container sx={{ bgcolor: "#ffffff" }}>
        {/* background image */}
        <Grid item="true" size={{ xs: 0, md: 7.5 }}>
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
          size={{ xs: 12, md: 4.2 }}
          display="flex"
          justifyContent="center"
        >
          <ResetPassForm />
        </Grid>
      </Grid>
    </>
  );
};

resetPassword.footerProps = {
  show: true,
  width: "60%",
  color: "#D9D9D9",
};

export default resetPassword;
