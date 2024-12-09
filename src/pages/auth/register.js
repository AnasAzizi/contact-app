import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Head from "next/head";
import Grid from "@mui/material/Grid2";
import RegisterForm from "@/components/RegisterForm";
import AuthFooter from "@/components/AuthFooter";

const register = () => {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Grid size={12} container sx={{ bgcolor: "#ffffff" }}>
        {/* background image */}
        <Grid item="true" size={{ xs: 0, md: 4, lg: 4.55 }}>
          <Box
            component="div"
            sx={{
              height: "100vh",
              position: "relative",
            }}
          >
            <Image
              src="/signBackground.jpg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="background"
              quality={100}
              fill
              style={{ objectFit: "cover" }}
              priority={true}
            />
          </Box>
        </Grid>
        {/* sign in form */}
        <Grid item="true" size={{ xs: 12, md: 8, lg: 7.45 }}>
          <RegisterForm />
        </Grid>
      </Grid>

      <AuthFooter width="35%" show={false} />
    </>
  );
};

export default register;
