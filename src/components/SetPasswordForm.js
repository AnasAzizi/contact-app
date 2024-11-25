import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import {
  Box,
  Button,
  Typography,
  OutlinedInput,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const SetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

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
              Password
            </InputLabel>
            <OutlinedInput
              label="Password=="
              sx={{ minHeight: "48px" }}
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
        <Grid
          item="true"
          display="flex"
          justifyContent={{ xs: "center", md: "left" }}
          mt="31px"
          alignItems="center"
        >
          <FormControl
            size="small"
            variant="outlined"
            sx={{ minWidth: { xs: "306px", md: "371px" } }}
          >
            <InputLabel sx={{ color: "#868E96", fontSize: "20px" }}>
              Confirm password
            </InputLabel>
            <OutlinedInput
              sx={{ minHeight: "48px" }}
              label="Confirm password===="
              type={showConfirmPassword ? "text" : "password"}
              endAdornment={
                <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                  {showConfirmPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </IconButton>
              }
            />
          </FormControl>
        </Grid>
        <Grid item="true" size={{ sx: "0px", md: 12 }}>
          <Button
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
      </Grid>
    </>
  );
};

export default SetPasswordForm;
