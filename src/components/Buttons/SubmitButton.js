import React from "react";
import { Button } from "@mui/material";

const SaveButton = ({ text }) => {
  return (
    <>
      <Button
        type="submit"
        fullWidth
        sx={{
          textTransform: "none",
          fontSize: "20px",
          boxShadow: "none",
          bgcolor: "#4E73DF",
        }}
        variant="contained"
      >
        {text}
      </Button>
    </>
  );
};

export default SaveButton;
