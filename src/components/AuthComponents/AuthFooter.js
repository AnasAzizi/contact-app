import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Container } from "@mui/material";
import Divider from "@mui/material/Divider";

const AuthFooter = ({ width, show }) => {
  const [showText, setShowText] = useState(show);

  return (
    <>
      <Box
        component="footer"
        sx={{
          width: "100%",
          color: { xs: "#000000", md: "#D9D9D9" },
          position: { xs: "relative", md: "absolute" },
          bottom: { xs: "unset", md: 0, lg: 0 },
          bgcolor: { xs: "#ffffff", md: "transparent" },
        }}
      >
        <Divider
          sx={{
            bgcolor: "#D9D9D9",
            mb: "16.5px",
          }}
        />

        <Container maxWidth="xl">
          <Box
            component="div"
            sx={{
              width: { xs: "100%", md: width },
              display: "flex",
              justifyContent: "space-between",
              opacity: "60%",
              ml: 0,
              mb: "10px",
              px: "10px",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "center" },
            }}
          >
            <Typography
              sx={{ fontSize: { sx: "16px", md: "14px", lg: "16px" } }}
            >
              Copyright © ITM Development | Contact Book | 2022
            </Typography>
            {showText && (
              <Typography
                sx={{
                  mt: { xs: 2, sm: 0 },
                  display: { xs: "none", md: "none", lg: "block" },
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
