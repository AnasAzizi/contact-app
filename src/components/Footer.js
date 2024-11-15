import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

const Footer = ({ width, show, color }) => {
  const [showText, setShowText] = useState(show);
  return (
    <>
      <Box
        bottom={10}
        component="footer"
        sx={{
          width: "100%",
          color: color,
          position: "fixed",
        }}
      >
        <Divider
          sx={{
            bgcolor: "#D9D9D9",
            mb: "20px",
          }}
        />

        <Box
          component="div"
          sx={{
            width: width,
            display: "flex",
            justifyContent: showText ? "space-around" : "start",
            opacity: "60%",
            pl: showText ? "0px" : "102px",
          }}
        >
          <Typography>
            Copyright © ITM Development | Contact Book | 2022
          </Typography>
          {showText && (
            <Typography>Privacy Policy - Terms & Conditions</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Footer;
