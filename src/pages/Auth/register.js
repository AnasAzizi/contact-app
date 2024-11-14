import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Head from "next/head";
import Grid from "@mui/material/Grid2";
import RegisterForm from '@/components/RegisterForm'

const register = () => {

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Grid container sx={{ bgcolor: "#ffffff" }} columnSpacing={{md:20,xs:0}}>
        {/* background image */}
        <Grid item="true" size={{xs:0,md:5.1}} >
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
        <Grid item="true" display="flex" justifyContent="center"  size={{xs:12,md:4.2}}>

            <RegisterForm />
        </Grid>
      </Grid>
    </>
  );
};

register.footerProps = {
  show: false,
  width: "60%",
  color: "#D9D9D9",
};

export default register;