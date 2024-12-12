import React from "react";
// import { useRouter } from "next/router";
import { Button } from "@mui/material";

const SaveButton = () => {
  // const router = useRouter();

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
        Save
      </Button>
    </>
  );
};

export default SaveButton;
