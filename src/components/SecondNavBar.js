import React from "react";
import { Divider, Typography } from "@mui/material";
const SecondNavBar = ({path}) => {
  return (
    <>
      <Typography mt={6} mb={1} variant="h5" color="black">
        {path}
      </Typography>
      <Divider sx={{ mb: "31px" }} />
    </>
  );
};

export default SecondNavBar;
