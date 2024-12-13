import React from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

const BackButton = ({ path }) => {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => router.push(path)}
        fullWidth
        variant="outlined"
        sx={{
          textTransform: "none",
          fontSize: "20px",
          color: "#4E73DF",
          borderColor: "#4E73DF",
        }}
      >
        Back
      </Button>
    </>
  );
};

export default BackButton;
