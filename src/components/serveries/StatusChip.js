import React from "react";
import { Chip } from "@mui/material";
import { styled } from "@mui/system";

const StyledChip = styled(Chip)(({ statuscolor }) => ({
  backgroundColor: statuscolor,
  borderRadius: "4px",
  width: "93px",
  fontSize: "16px",
}));

const StatusChip = ({ label, statusColor, ...props }) => {
  return (
    <StyledChip
      label={label}
      statuscolor={statusColor}
      {...props} 
    />
  );
};

export default StatusChip;
