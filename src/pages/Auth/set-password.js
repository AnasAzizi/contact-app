import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import SetPasswordForm from "@/components/SetPasswordForm";
import Head from "next/head";
import Grid from "@mui/material/Grid2";

const SetPassword = () => {
  return (
    <>
      <Head>
        <title>Set Password</title>
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
          <SetPasswordForm />
        </Grid>
      </Grid>
    </>
  );
};

SetPassword.footerProps = {
  show: true,
  width: "60%",
  color: "#D9D9D9",
};

export default SetPassword;
