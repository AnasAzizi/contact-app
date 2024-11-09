import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <Box component="div" sx={{ width: "49%" }}>
        <Typography
          sx={{
            mb: "41px",
            fontWeight: "bold",
            color: "#212529",
            fontSize: "42px",
          }}
          align="left"
          variant="h4"
        >
          Sign In
        </Typography>
        <FormGroup>
          <FormControl size="small" variant="outlined">
            <InputLabel sx={{ color: "#868E96" }}>Email</InputLabel>
            <OutlinedInput label="Email" type="email" />
          </FormControl>
          <FormControl
            size="small"
            sx={{
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
          <Box
            component="div"
            sx={{
              display: "flex",
              direction: "row",
              alignItems: "center",
              justifyContent: "space-between",
              mb: "47px",
            }}
          >
            <FormControlLabel
              sx={{ color: "#212529" }}
              control={<Checkbox />}
              label="Remember me"
            />
            <Typography
              sx={{
                textDecoration: "underline",
                color: "#212529",
                cursor: "pointer",
                "&:hover": {
                  color: "blue",
                },
              }}
            >
              Forgot Password
            </Typography>
          </Box>
          <Box align="center" component="div" sx={{ width: 1 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#4E73DF",
                width: 1, //full width
                textTransform: "none", //to lowercase
                mb: "24px",
                fontSize: "20px",
              }}
            >
              <Typography variant="h6">Sign in</Typography>
            </Button>
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

            <Button
              sx={{
                px: "40px",
                textTransform: "none",
              }}
              align="center"
              variant="outlined"
            >
              <Typography variant="h6">sign up</Typography>
            </Button>
          </Box>
        </FormGroup>
      </Box>
    </>
  );
};

export default SignInForm;
