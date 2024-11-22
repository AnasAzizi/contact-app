import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Typography,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const ResetPassForm = () => {
  const router = useRouter();

  return (
    <>
      <Grid
        container
        direction="column"
        display="flex"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Box
          component="div"
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
            mb: "68px",
          }}
        >
          <Image
            src="/Logo_Vertical.svg"
            alt="background"
            quality={100}
            width={150}
            height={145}
          />
        </Box>
        <Typography
          sx={{
            display: { xs: "none", md: "block" },
            mb: "41px",
            fontWeight: "bold",
            color: "#212529",
            fontSize: "42px",
          }}
          align="left"
        >
          Change Password
        </Typography>
        <Grid
          item="true"
          display="flex"
          justifyContent={{ xs: "center", md: "left" }}
          alignItems="center"
        >
          <FormControl
            size="small"
            sx={{
              minWidth: { xs: "306px", md: "371px" },
            }}
            variant="outlined"
          >
            <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>
              Enter your email address
            </InputLabel>
            <OutlinedInput
              sx={{ minHeight: "48px" }}
              label="Enter your email address====="
              type="text"
            />
          </FormControl>
        </Grid>
        <Grid item="true" size={{ sx: "0px", md: 12 }}>
          <Button
            onClick={() => router.push("/auth/set-password")}
            variant="contained"
            sx={{
              bgcolor: "#4E73DF",
              textTransform: "none",
              boxShadow: "none",
              mt: "37px",
              fontSize: "20px",
              minWidth: { xs: "306px", md: "370px" },
            }}
          >
            Send
          </Button>
        </Grid>

        <Grid
          item="true"
          display="flex"
          justifyContent="center"
          mt="57px"
          size={12}
          sx={{
            color: "#4E73DF",
            textDecoration: "underline",
            fontSize: "20px",
          }}
        >
          <Link href="/auth/sign-in">Back to login</Link>
        </Grid>
      </Grid>
    </>
  );
};

export default ResetPassForm;
