import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { RegisterUser } from "@/pages/api/auth";
import SnackbarAlert from "@/components/SnackbarAlert";
import {
  Box,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  Button,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Grid from "@mui/material/Grid2";

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    companyName: "",
    vatNumber: "",
    streetOne: "",
    streetTwo: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    phoneNumber: "5346504463",
  });

  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password || formData.password.length < 8)
      newErrors.password = "Password most be 8";
    if (!formData.companyName)
      newErrors.companyName = "companyName is required.";
    if (!formData.vatNumber) newErrors.vatNumber = "vatNumber is required.";
    if (!formData.streetOne) newErrors.streetOne = "streetOne is required.";
    if (!formData.city) newErrors.city = "city is required.";
    if (!formData.zip) newErrors.zip = "zip is required.";
    if (!formData.state) newErrors.state = "state is required.";
    if (!formData.country) newErrors.country = "country is required.";

    if (!termsAccepted) newErrors.terms = "You must accept the terms.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { mutateAsync: userRegister } = useMutation({
    mutationFn: (data) => RegisterUser(data),
    onSuccess: () => {
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Registration successful!");
      router.push("/auth/sign-in");
    },
    onError: (error) => {
      console.error("Error registering:", error);
      setOpenSnackbar(true);
      setSnackbarSeverity(error.response?.status === 403 ? "error" : "warning");
      setSnackbarMessage(getErrorMessage(error));
    },
  });

  const getErrorMessage = (error) => {
    if (error.response && error.response.status === 403) {
      return "Validation errors occurred. Email is taken.";
    } else if (error.response && error.response.status === 500) {
      return "An unexpected server error occurred. Please try again later.";
    } else {
      return "Registration failed. Please check your input and try again.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await userRegister(formData);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          pt: { xs: "20px", md: "0px" },
        }}
      >
        <Grid container size={{ xs: 10, md: 10, lg: 8.2 }}>
          <Grid item="true" size={{ xs: 12, md: 12 }}>
            <Typography
              color="#212529"
              fontSize="42px"
              fontWeight="bold"
              mb="10px"
            >
              Create Account
            </Typography>
          </Grid>

          <Grid item="true" size={{ xs: 12, md: 12 }}>
            <Typography
              sx={{ opacity: "40%" }}
              color="#212529"
              fontSize="26px"
              mb="22px"
            >
              Account details
            </Typography>
          </Grid>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid
              item="true"
              container
              size={12}
              minWidth={{ xs: { md: "330px" } }}
              direction={{ xs: "column", md: "row" }}
              columnSpacing="62px"
              rowSpacing="24px"
              wrap="wrap"
            >
              <Grid item="true" size={{ xs: 12, md: 6 }}>
                <FormControl
                  size="small"
                  variant="outlined"
                  fullWidth
                  error={!!errors.firstName}
                >
                  <InputLabel
                    sx={{
                      color: "#868E96",
                      fontSize: "20px",
                      fontSize: "20px",
                    }}
                  >
                    First Name
                  </InputLabel>
                  <OutlinedInput
                    sx={{ minHeight: "48px" }}
                    label="First Name=="
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <FormHelperText>{errors.firstName}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 6 }}>
                <FormControl
                  size="small"
                  variant="outlined"
                  fullWidth
                  error={!!errors.lastName}
                >
                  <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>
                    Last Name
                  </InputLabel>
                  <OutlinedInput
                    sx={{ minHeight: "48px" }}
                    label="Last Name=="
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <FormHelperText>{errors.lastName}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 6 }}>
                <FormControl
                  size="small"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                >
                  <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>
                    Email
                  </InputLabel>
                  <OutlinedInput
                    sx={{ minHeight: "48px" }}
                    label="Email="
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <FormHelperText>{errors.email}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 6 }}>
                <FormControl
                  size="small"
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
                >
                  <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>
                    Password
                  </InputLabel>
                  <OutlinedInput
                    sx={{ minHeight: "48px" }}
                    label="Password="
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? (
                          <VisibilityOffOutlinedIcon />
                        ) : (
                          <VisibilityOutlinedIcon />
                        )}
                      </IconButton>
                    }
                  />
                  {errors.password && (
                    <FormHelperText>{errors.password}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              size={12}
              sx={{ opacity: "40%" }}
              color="#212529"
              fontSize="26px"
              mb="22px"
              mt="30px"
            >
              Billing details
            </Grid>

            <Grid
              item="true"
              size={12}
              container
              minWidth={{ xs: { md: "330px" } }}
              direction={{ xs: "column", md: "row" }}
              columnSpacing="62px"
              rowSpacing="24px"
              wrap="wrap"
            >
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl
                  size="small"
                  variant="outlined"
                  fullWidth
                  error={!!errors.companyName}
                >
                  <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>
                    Company Name
                  </InputLabel>
                  <OutlinedInput
                    sx={{ minHeight: "48px" }}
                    label="Company Name==="
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                  {errors.companyName && (
                    <FormHelperText>{errors.companyName}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl
                  size="small"
                  variant="outlined"
                  fullWidth
                  error={!!errors.vatNumber}
                >
                  <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>
                    VAT Number
                  </InputLabel>
                  <OutlinedInput
                    sx={{ minHeight: "48px" }}
                    label="VAT Number=="
                    type="text"
                    name="vatNumber"
                    value={formData.vatNumber}
                    onChange={handleChange}
                  />
                  {errors.vatNumber && (
                    <FormHelperText>{errors.vatNumber}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl
                  size="small"
                  variant="outlined"
                  fullWidth
                  error={!!errors.streetOne}
                >
                  <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>
                    Street
                  </InputLabel>
                  <OutlinedInput
                    sx={{ minHeight: "48px" }}
                    label="Street="
                    type="text"
                    name="streetOne"
                    value={formData.streetOne}
                    onChange={handleChange}
                  />
                  {errors.streetOne && (
                    <FormHelperText>{errors.streetOne}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl size="small" variant="outlined" fullWidth>
                  <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>
                    Street 2 (Optional)
                  </InputLabel>
                  <OutlinedInput
                    sx={{ minHeight: "48px" }}
                    label="Street 2 (Optional)==="
                    type="text"
                    name="streetTwo"
                    value={formData.streetTwo}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl
                  size="small"
                  variant="outlined"
                  fullWidth
                  error={!!errors.city}
                >
                  <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>
                    City
                  </InputLabel>
                  <OutlinedInput
                    sx={{ minHeight: "48px" }}
                    label="City="
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && (
                    <FormHelperText>{errors.city}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl
                  size="small"
                  variant="outlined"
                  fullWidth
                  error={!!errors.state}
                >
                  <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>
                    State
                  </InputLabel>
                  <OutlinedInput
                    sx={{ minHeight: "48px" }}
                    label="State="
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                  {errors.state && (
                    <FormHelperText>{errors.state}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl
                  size="small"
                  variant="outlined"
                  fullWidth
                  error={!!errors.zip}
                >
                  <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>
                    Zip
                  </InputLabel>
                  <OutlinedInput
                    sx={{ minHeight: "48px" }}
                    label="Zip="
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                  />
                  {errors.zip && <FormHelperText>{errors.zip}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl
                  size="small"
                  variant="outlined"
                  fullWidth
                  error={!!errors.country}
                >
                  <InputLabel
                    sx={{
                      color: "#868E96",
                      fontSize: "20px",
                      minHeight: "48px",
                    }}
                  >
                    Select your country
                  </InputLabel>
                  <Select
                    sx={{ minHeight: "48px" }}
                    label="Select your country==="
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <MenuItem value={"Turkey"}>Turkey</MenuItem>
                    <MenuItem value={"Syria"}>Syria</MenuItem>
                    <MenuItem value={"Moroco"}>Moroco</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              container
              item="true"
              size={12}
              display="flex"
              direction="column"
              alignItems="center"
            >
              <Grid
                container
                size={12}
                item="true"
                alignItems="center"
                mt="7px"
                mb="11px"
                wrap="nowrap"
              >
                <Checkbox
                  size="medium"
                  sx={{ color: "#B7B7B7", pl: 0 }}
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)} // Update termsAccepted state
                />
                <Typography sx={{ fontSize: "18px", color: "black" }}>
                  I agree to the website terms and conditions
                </Typography>
              </Grid>

              <Grid item="true" size={12}>
                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    bgcolor: "#4E73DF",
                    textTransform: "none",
                    boxShadow: "none",
                    fontSize: "20px",
                    mb: "30px",
                  }}
                  variant="contained"
                >
                  Register
                </Button>
              </Grid>
              <Grid item="true">
                <Link
                  href="/auth/sign-in"
                  style={{
                    textDecoration: "underline",
                    color: "#4E73DF",
                    fontSize: "20px",
                  }}
                >
                  Sign in instead
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Box>
      <SnackbarAlert
        open={openSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default RegisterForm;
