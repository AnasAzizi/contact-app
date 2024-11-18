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

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Grid container size={8.2}>
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
              <FormControl variant="outlined" fullWidth>
                <InputLabel sx={{ color: "#868E96" }}>First Name</InputLabel>
                <OutlinedInput label="First Name" type="text" />
              </FormControl>
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 6 }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel sx={{ color: "#868E96" }}>Last Name</InputLabel>
                <OutlinedInput label="Last Name" type="text" />
              </FormControl>
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 6 }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel sx={{ color: "#868E96" }}>Email</InputLabel>
                <OutlinedInput label="Email" type="email" />
              </FormControl>
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 6 }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel sx={{ color: "#868E96" }}>Password</InputLabel>
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
              <FormControl variant="outlined" fullWidth>
                <InputLabel sx={{ color: "#868E96" }}>Company Name</InputLabel>
                <OutlinedInput label="Company Name" type="text" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel sx={{ color: "#868E96" }}>VAT Number</InputLabel>
                <OutlinedInput label="VAT Number" type="number" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel sx={{ color: "#868E96" }}>Street</InputLabel>
                <OutlinedInput label="Street" type="text" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel sx={{ color: "#868E96" }}>
                  Street 2 (Optional)
                </InputLabel>
                <OutlinedInput label="Street 2 (Optional)" type="text" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel sx={{ color: "#868E96" }}>City</InputLabel>
                <OutlinedInput label="City" type="text" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel sx={{ color: "#868E96" }}>State</InputLabel>
                <OutlinedInput label="State" type="text" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel sx={{ color: "#868E96" }}>Zip</InputLabel>
                <OutlinedInput label="Zip" type="number" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel sx={{ color: "#868E96" }}>
                  Select your country
                </InputLabel>
                <Select label="Select your country">
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
              mt="9px"
              mb="31px"
            >
              <Checkbox sx={{ color: "#B7B7B7" }} />
              <Typography sx={{ fontSize: "18px", color: "black" }}>
                I agree to the website terms and conditions
              </Typography>
            </Grid>

            <Grid item="true" size={12}>
              <Button
                fullWidth
                sx={{
                  bgcolor: "#4E73DF",
                  textTransform: "none",
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
        </Grid>
      </Box>
    </>
  );
};

export default RegisterForm;
