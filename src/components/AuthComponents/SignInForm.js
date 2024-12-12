import React, { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { LoginUser } from "@/pages/api/auth";
import SnackbarAlert from "@/components/layouts/SnackbarAlert";
import FormValidator from "@/components/serveries/FormValidator";
import {
  Checkbox,
  Box,
  Divider,
  Button,
  Typography,
  FormControlLabel,
  OutlinedInput,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { CurrnetUserContext } from "@/Context/Context";

export default function SignInForm() {
  const router = useRouter();
  const { setToken } = useContext(CurrnetUserContext);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const emptyFields = FormValidator({
    formData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { mutateAsync: LoginUserMutate } = useMutation({
    mutationFn: (data) => LoginUser(data),
    onSuccess: (data) => {
      setToken(data);
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Registration successful!");
      router.push("/home");
    },
    onError: (error) => {
      console.error("Error registering:", error);
      setOpenSnackbar(true);
      setSnackbarSeverity(error.response?.status === 403 ? "error" : "warning");
      setSnackbarMessage(getErrorMessage(error));
    },
  });

  const getErrorMessage = (error) => {
    if (error.response && error.response.status === 401) {
      return "Validation errors occurred. please check your email or password and try again.";
    } else if (error.response && error.response.status === 500) {
      return "An unexpected server error occurred. Please try again later.";
    } else {
      return "Login failed. Please check your input and try again.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emptyFields.length > 0) {
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setSnackbarMessage(
        `Please fill the following required fields: ${emptyFields.join(", ")}`
      );
      return;
    }
    try {
      await LoginUserMutate(formData);
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
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid
            item="true"
            display="flex"
            justifyContent={{ xs: "center", md: "left" }}
            alignItems="center"
          >
            <FormControl
              size="small"
              variant="outlined"
              sx={{ minWidth: { xs: "306px", md: "371px" } }}
            >
              <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>
                Email
              </InputLabel>
              <OutlinedInput
                name="email"
                onChange={handleChange}
                sx={{ minHeight: "48px" }}
                label="Email="
                type="email"
              />
            </FormControl>
          </Grid>
          <Grid
            item="true"
            display="flex"
            justifyContent={{ xs: "center", md: "left" }}
            alignItems="center"
          >
            <FormControl
              onChange={handleChange}
              size="small"
              sx={{
                minWidth: { xs: "306px", md: "371px" },
                mt: "35px",
                mb: "12px",
              }}
              variant="outlined"
            >
              <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>
                Password
              </InputLabel>
              <OutlinedInput
                name="password"
                sx={{ minHeight: "48px" }}
                label="Password=="
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </IconButton>
                }
              />
            </FormControl>
          </Grid>
          <Grid
            item="true"
            display="flex"
            direction="row"
            alignItems="center"
            gap={4}
            justifyContent={{ xs: "center", md: "space-between" }}
            maxWidth={{ xs: "none", md: "370px" }}
          >
            <FormControlLabel
              sx={{ color: "#212529" }}
              control={<Checkbox sx={{ color: "#B7B7B7" }} />}
              label="Remember me"
            />
            <Link
              href="/auth/forgot-password"
              style={{
                textDecoration: "underline",
                color: "#212529",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Forgot Password
            </Link>
          </Grid>

          <Grid
            container
            item="true"
            display="flex"
            flexDirection="column"
            alignItems="center"
            size={{ xs: 12, md: 12 }}
          >
            <Grid item="true" size={{ sx: "0px", md: 12 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#4E73DF",
                  textTransform: "none",
                  boxShadow: "none",
                  mb: "24px",
                  mt: "38px",
                  fontSize: "20px",
                  minWidth: { xs: "306px", md: "370px" },
                }}
              >
                Sign in
              </Button>
            </Grid>
            <Grid item="true" size={{ xs: 10, md: 12 }}>
              <Divider
                sx={{
                  fontFamily: "Roboto",
                  mb: "26px",
                  color: "#212529",
                  "&::before, &::after": {
                    borderColor: "#212529",
                  },
                }}
              >
                Don&apos;t have account?
              </Divider>
            </Grid>
            <Grid item="true">
              <Button
                onClick={() => router.push("/auth/register")}
                variant="outlined"
                sx={{
                  textTransform: "none",
                  fontSize: "20px",
                  minWidth: "146px",
                  color: "#4E73DF",
                  borderColor: "#4E73DF",
                }}
              >
                Sign up
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <SnackbarAlert
        open={openSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </>
  );
}
