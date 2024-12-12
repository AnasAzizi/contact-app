import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { ResetPassword } from "@/pages/api/auth";
import SnackbarAlert from "@/components/SnackbarAlert";
import {
  Box,
  Button,
  Typography,
  OutlinedInput,
  InputLabel,
  FormControl,
  IconButton,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const ResetPassForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const validatePassword = () => {
    const errors = {};
    let isValid = true;

    if (!password) {
      errors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required.";
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const { mutateAsync: ResetPasswordMutate } = useMutation({
    mutationFn: (password) => ResetPassword(password, router),
    onSuccess: () => {
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Password reset successful!");
      router.push("/auth/sign-in");
    },
    onError: (error) => {
      console.error("Error resetting password:", error);
      setOpenSnackbar(true);
      if (error.response?.status === 404) {
        setSnackbarSeverity("error");
        setSnackbarMessage("An unexpected error.");
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("An unexpected error occurred. Please try again.");
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    try {
      await ResetPasswordMutate(password);
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
          Set a Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid
            item="true"
            display="flex"
            justifyContent={{ xs: "center", md: "left" }}
            alignItems="center"
          >
            <FormControl
              error={!!error.password}
              size="small"
              sx={{
                minWidth: { xs: "306px", md: "371px" },
              }}
              variant="outlined"
            >
              <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>
                Password
              </InputLabel>
              <OutlinedInput
                label="Password=="
                sx={{ minHeight: "48px" }}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {error.password && (
                <FormHelperText>{error.password}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid
            item="true"
            display="flex"
            justifyContent={{ xs: "center", md: "left" }}
            mt="31px"
            alignItems="center"
          >
            <FormControl
              error={!!error.confirmPassword}
              size="small"
              variant="outlined"
              sx={{ minWidth: { xs: "306px", md: "371px" } }}
            >
              <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>
                Confirm Password
              </InputLabel>
              <OutlinedInput
                sx={{ minHeight: "48px" }}
                label="Confirm Password==="
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                endAdornment={
                  <IconButton
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </IconButton>
                }
              />
              {error.confirmPassword && (
                <FormHelperText>{error.confirmPassword}</FormHelperText>
              )}
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
                mt: "56px",
                fontSize: "20px",
                minWidth: { xs: "306px", md: "370px" },
              }}
            >
              Reset Password
            </Button>
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
};

export default ResetPassForm;
