import React from "react";
import TextField from "@mui/material/TextField";

const CustomTextField = ({
  name,
  value,
  onChange,
  type = "text",
  ...props
}) => {
  return (
    <TextField
      size="small"
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      {...props}
    />
  );
};

export default CustomTextField;
