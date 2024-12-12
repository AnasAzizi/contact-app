import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import ForgotPassForm from "@/components/AuthComponents/ForgotPassForm";
import Head from "next/head";
import Grid from "@mui/material/Grid2";
import AuthFooter from "@/components/AuthComponents/AuthFooter";

const ForgotPassword = () => {
  return (
    <>
      <Head>
        <title>Reset password</title>
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
        {/* forget pass form */}
        <Grid
          item="true"
          size={{ xs: 12, md: 5.5, lg: 4.5 }}
          display="flex"
          justifyContent="center"
        >
          <ForgotPassForm />
        </Grid>
      </Grid>
      <AuthFooter show={true} width="60%" />
    </>
  );
};

export default ForgotPassword;
