import React from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import EditOffOutlinedIcon from "@mui/icons-material/EditOffOutlined";


const EditButton = ({ path }) => {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => router.push(path)}
        fullWidth
        sx={{
          textTransform: "none",
          fontSize: "20px",
          color: "#4E73DF",
        }}
        variant="outlined"
        startIcon={<EditOffOutlinedIcon />}
      >
        Edit
      </Button>
    </>
  );
};

export default EditButton;
