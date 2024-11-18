import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
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

export default function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
          Sign In
        </Typography>
        <Grid
          item="true"
          display="flex"
          justifyContent={{ xs: "center", md: "left" }}
          alignItems="center"
        >
          <FormControl
            size="medium"
            variant="outlined"
            sx={{ minWidth: { xs: "306px", md: "371px" } }}
          >
            <InputLabel sx={{ color: "#868E96" }}>Email</InputLabel>
            <OutlinedInput label="Email" type="email" />
          </FormControl>
        </Grid>
        <Grid
          item="true"
          display="flex"
          justifyContent={{ xs: "center", md: "left" }}
          alignItems="center"
        >
          <FormControl
            size="medium"
            sx={{
              minWidth: { xs: "306px", md: "371px" },
              mt: "35px",
              mb: "22px",
            }}
            variant="outlined"
          >
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
            control={<Checkbox color="#B7B7B7" />}
            label="Remember me"
          />
          <Link
            href="/auth/reset-password"
            style={{
              textDecoration: "underline",
              color: "#212529",
              cursor: "pointer",
              fontSize:"15px"
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
          mx={{ xs: "36px", md: "0px" }}
          size={{ xs: 12, md: 12 }}
        >
          <Grid item="true" size={{ sx: "0px", md: 12 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#4E73DF",
                textTransform: "none",
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
                mb: "26px",
                color: "#212529",
                "&::before, &::after": {
                  borderColor: "#212529",
                },
              }}
            >
              Don't have account?
            </Divider>
          </Grid>
          <Grid item="true">
            <Box>
              <Button
                onClick={() => router.push("/auth/register")}
                variant="outlined"
                sx={{
                  textTransform: "none",
                  fontSize: "20px",
                  minWidth: "146px",
                }}
              >
                Sign up
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
