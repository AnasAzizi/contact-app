import React from "react";
import Grid from "@mui/material/Grid2";
import Label from "@/components/serveries/Label";
import CustomTextField from "@/components/serveries/CustomTextField";

const ContactFromGrid = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  disabled,
  multiline,
  rows,
  type,
}) => (
  <Grid item="true" size={{ xs: 12, md: 5.7 }}>
    <Label label={label} />
    <CustomTextField
      fullWidth
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      type={type}
    />
  </Grid>
);

export default ContactFromGrid;
