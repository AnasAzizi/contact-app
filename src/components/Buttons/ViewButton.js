import React from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
const ViewButton = ({ path }) => {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => router.push(path)}
        variant="contained"
        sx={{
          bgcolor: "#4E73DF",
          borderRadius: "5px",
          textTransform: "none",
          fontSize: "16px",
          boxShadow: 0,
        }}
      >
        View
      </Button>
    </>
  );
};

export default ViewButton;
