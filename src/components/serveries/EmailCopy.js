import React, { useState } from "react";
import { IconButton,Tooltip } from "@mui/material";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";

const EmailCopy = ({email}) => {
  const [tooltipText, setTooltipText] = useState("Copy");
  const handleClickIcon = () => {
    setTooltipText("Copied!");
    setTimeout(() => setTooltipText("Copy"), 1000);
  };

  return (
    <>
      <Tooltip
        slotProps={{
          tooltip: {
            sx: {
              bgcolor: "white",
              color: "black",
              fontSize: "16px",
            },
          },
        }}
        title={tooltipText}
        placement="top"
      >
        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(email);
            handleClickIcon();
          }}
        >
          <FileCopyOutlinedIcon
            sx={{
              cursor: "pointer",
              fontSize: "18px",
            }}
          />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default EmailCopy;
