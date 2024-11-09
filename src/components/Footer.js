import React from 'react'
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Divider from '@mui/material/Divider';

const Footer = ({ width }) => {
  return (
    <>
      <Box
        bottom={10}
        component="footer"
        sx={{
          width: "100%",
          color: "#D9D9D9",
          position: "fixed"
        }}>
        <Divider sx={{
          bgcolor: "#D9D9D9",
          mb: "20px"
        }}
        />

        <Box component="div"
          sx={{
            width: width,
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <Typography>
            Copyright © ITM Development | Contact Book | 2022
          </Typography>
          <Typography>
            Privacy Policy - Terms & Conditions
          </Typography>
        </Box>

      </Box>
    </>
  )
}

export default Footer
