import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Container
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Grid from "@mui/material/Grid2";
import Link from "next/link";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
    
    <Grid container alignItems="center" direction="column" justifyContent="center">
        <Grid
          size={6}
        >
          <Typography
            color="#212529" fontSize="42px" fontWeight="bold" mb="42px"
          >
            Create Account
          </Typography>
        </Grid>

        <Grid
          size={6}

        >
          <Typography
            sx={{ opacity: "40%" }}
            color="#212529"
            fontSize="26px"
            mb="22px">
            Account details
          </Typography>
        </Grid>
        <Grid
          item="true"
          container
          minWidth="370px"
          direction={{ xs: "column", md: "row" }}
          columnSpacing="62px"
          rowSpacing="24px"
          wrap="wrap"
        >
          <Grid item="true" size={{ xs: 12, md: 6 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>First Name</InputLabel>
              <OutlinedInput label="First Name" type="text"></OutlinedInput>
            </FormControl>
          </Grid>
          <Grid item="true" size={{ xs: 12, md: 6 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>Last Name</InputLabel>
              <OutlinedInput label="Last Name" type="text"></OutlinedInput>
            </FormControl>
          </Grid>
          <Grid item="true" size={{ xs: 12, md: 6 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>Email</InputLabel>
              <OutlinedInput label="Email" type="email"></OutlinedInput>
            </FormControl>
          </Grid>
          <Grid item="true" size={{ xs: 12, md: 6 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>Password</InputLabel>
              <OutlinedInput
                label="Password"
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
          size={6}
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
          container
          minWidth="370px"
          direction={{ xs: "column", md: "row" }}
          columnSpacing="62px"
          rowSpacing="24px"
          wrap="wrap"
          mb="24px"
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>Company Name</InputLabel>
              <OutlinedInput label="Company Name" type="text"></OutlinedInput>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>VAT Number</InputLabel>
              <OutlinedInput label="VAT Number" type="number"></OutlinedInput>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>Street</InputLabel>
              <OutlinedInput label="Street" type="text"></OutlinedInput>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>
                Street 2 (Optional)
              </InputLabel>
              <OutlinedInput
                label="Street 2 (Optional)555"
                type="text"
              ></OutlinedInput>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>City</InputLabel>
              <OutlinedInput label="City" type="text"></OutlinedInput>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>State</InputLabel>
              <OutlinedInput label="State" type="text"></OutlinedInput>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>Zip</InputLabel>
              <OutlinedInput label="Zip" type="number"></OutlinedInput>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>Select your country</InputLabel>
              <Select
                label="Select your country"
              >
                <MenuItem value={"Turkey"}>Turkey</MenuItem>
                <MenuItem value={"Syria"}>Syria</MenuItem>
                <MenuItem value={"Moroco"}>Moroco</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid container flex direction="column" alignItems="center">
          <Grid item="true">
            <FormControlLabel
              sx={{ color: "#212529", mb: "46px" }}
              control={<Checkbox defaultChecked />}
              label="I agree to the website terms and conditions"
            />
          </Grid>
          <Grid item="true">
            <Button
              sx={{
                bgcolor: "#4E73DF",
                textTransform: "none",
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
              style={{ textDecoration: "underline", color: "#4E73DF" }}
            >
              Sign in instead
            </Link>
          </Grid>
        </Grid> */}
    </>
  );
};

export default RegisterForm;
