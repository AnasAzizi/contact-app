import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import FormGroup from "@mui/material/FormGroup";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";

const SetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  return (
    <>
      <Box component="div" sx={{ width: "49%" }}>
        <Typography
          sx={{
            mb: "46px",
            fontWeight: "bold",
            color: "#212529",
            fontSize: "42px",
          }}
          align="left"
          variant="h4"
        >
          Set a Password
        </Typography>
        <FormGroup>
          {/* First Password Field */}
          <FormControl size="small" variant="outlined">
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

          {/* Confirm Password Field */}
          <FormControl
            size="small"
            sx={{
              mt: "31px",
              mb: "56px",
            }}
            variant="outlined"
          >
            <InputLabel sx={{ color: "#868E96" }}>Confirm password</InputLabel>
            <OutlinedInput
              label="Confirm password"
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

          <Box align="center" component="div" sx={{ width: 1 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#4E73DF",
                width: 1, // Full width
                textTransform: "none", // To lowercase
                fontSize: "20px",
              }}
            >
              <Typography variant="h6">Reset Password</Typography>
            </Button>
          </Box>
        </FormGroup>
      </Box>
    </>
  );
};

export default SetPasswordForm;
