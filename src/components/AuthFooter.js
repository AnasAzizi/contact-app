import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Container } from "@mui/material";
import Divider from "@mui/material/Divider";

const AuthFooter = ({ width, show }) => {
  const [showText, setShowText] = useState(show);

  return (
    <>
      <Box
        bottom={10}
        component="footer"
        sx={{
          width: "100%",
          color: { xs: "#000000", md: "#D9D9D9" },
          position: { xs: "relative", md: "fixed" },
          bottom: { xs: "unset", md: 10 },
        }}
      >
        <Divider
          sx={{
            bgcolor: "#D9D9D9",
            mb: "16.5px",
          }}
        />

        <Container maxWidth={showText ? "xl" : false}>
          <Box
            component="div"
            sx={{
              width: width,
              display: "flex",
              justifyContent: showText ? "space-between" : "start",
              opacity: "60%",
              ml: showText ? "0px" : "100px",
              mb: "10px",
              px: "10px",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "flex-start" },
            }}
          >
            <Typography>
              Copyright © ITM Development | Contact Book | 2022
            </Typography>
            {showText && (
              <Typography
                sx={{
                  mt: { xs: 2, sm: 0 },
                  display: { xs: "none", md: "block" },
                }}
              >
                Privacy Policy - Terms & Conditions
              </Typography>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AuthFooter;
