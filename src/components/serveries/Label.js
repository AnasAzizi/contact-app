import React from "react";
import { Typography } from "@mui/material";

const Label = ({ label, withStar }) => {
  return (
    <>
      <Typography mb="12px" color="black" fontSize="20px">
        {label}  
        {withStar && <span style={{ color: "#C70000" }}> *</span>}
      </Typography>
    </>
  );
};

export default Label;
