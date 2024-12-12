import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/pages/api/auth";
import SnackbarAlert from "@/components/layouts/SnackbarAlert";
import {
  Box,
  Button,
  Typography,
  OutlinedInput,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const ForgotPassForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const validateEmail = () => {
    if (!email) {
      setError({ email: "Email is required." });
      return false;
    }
    return true;
  };

  const { mutateAsync: forgotPasswordMutate } = useMutation({
    mutationFn: (email) => forgotPassword(email),
    onSuccess: () => {
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Registration successful!");
      router.push("/auth/reset-password");
    },
    onError: (error) => {
      console.error("Error registering:", error);
      setOpenSnackbar(true);
      if (error.response.status === 404) {
        setSnackbarSeverity("error");
        setSnackbarMessage("User not found. Please check the email address.");
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    try {
      await forgotPasswordMutate(email);
    } catch (e) {
      console.error(e);
    }
  };

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
            priority={true}
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
        <Box component="form" onSubmit={handleSubmit}>
          <Grid
            item="true"
            display="flex"
            justifyContent={{ xs: "center", md: "left" }}
            alignItems="center"
          >
            <FormControl
              error={!!error.email}
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
                name="email"
                onChange={handleChange}
                sx={{ minHeight: "48px" }}
                label="Enter your email address====="
                type="email"
              />
              {error.email && <FormHelperText>{error.email}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item="true" size={{ sx: "0px", md: 12 }}>
            <Button
              type="submit"
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
        </Box>

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
      <SnackbarAlert
        open={openSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default ForgotPassForm;
