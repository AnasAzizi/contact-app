import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";

const ResetPassForm = () => {
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
          Change Password
        </Typography>
        <FormGroup>
          <FormControl size="small" variant="outlined">
            <InputLabel sx={{
              color: "#868E96",
            }}>Enter your email address</InputLabel>
            <OutlinedInput label="Enter your email address" type="email" />
          </FormControl>
          <Box align="center" component="div" sx={{
            width: 1,
            mt: "46px",
            mb: "57px"
          }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#4E73DF",
                width: 1, //full width
                textTransform: "none", //to lowercase
                fontSize: "20px",
              }}
            >
              <Typography variant="h6">Send</Typography>
            </Button>
          </Box>
        </FormGroup>
        <Typography variant="h6" align="center" color="#4E73DF"
          sx={{
            textDecoration: 'underline',
            cursor: "pointer"
          }} >Back to login</Typography>
      </Box>
    </>
  );
};

export default ResetPassForm;
