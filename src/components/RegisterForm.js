import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
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
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Grid from "@mui/material/Grid2";
import Link from "next/link";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addUser = async () => {
    try {
      const response = await axios.post(
        "https://ms.itmd-b1.com:5123/api/register",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response:", response);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  console.log("formData", formData);

  const { mutateAsync: userRegister } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      alert("Registration successful!");
    },
    onError: (error) => {
      console.error("Error registering:", error);
      alert("Registration failed.");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
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
              mb="22px"
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
                <FormControl size="small" variant="outlined" fullWidth>
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
                </FormControl>
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 6 }}>
                <FormControl size="small" variant="outlined" fullWidth>
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
                </FormControl>
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 6 }}>
                <FormControl size="small" variant="outlined" fullWidth>
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
                </FormControl>
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 6 }}>
                <FormControl size="small" variant="outlined" fullWidth>
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
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              size={12}
              sx={{ opacity: "40%" }}
              color="#212529"
              fontSize="26px"
              mb="22px"
              mt="50px"
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
                <FormControl size="small" variant="outlined" fullWidth>
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
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl size="small" variant="outlined" fullWidth>
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
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl size="small" variant="outlined" fullWidth>
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
                <FormControl size="small" variant="outlined" fullWidth>
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
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl size="small" variant="outlined" fullWidth>
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
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl size="small" variant="outlined" fullWidth>
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
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl size="small" variant="outlined" fullWidth>
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
                mt="14px"
                mb="31px"
                wrap="nowrap"
              >
                <Checkbox size="medium" sx={{ color: "#B7B7B7", pl: 0 }} />
                <Typography sx={{ fontSize: "18px", color: "black" }}>
                  I agree to the website terms and conditions
                </Typography>
              </Grid>

              <Grid item="true" size={12}>
                <Button
                  // onClick={handleSubmit}
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
    </>
  );
};

export default RegisterForm;
