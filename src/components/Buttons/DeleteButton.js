import React from "react";
import { Button } from "@mui/material";

const DeleteButton = ({handleDelete,selectedIds}) => {
  return (
    <>
      <Button
        onClick={handleDelete}
        fullWidth
        disabled={selectedIds.length === 0}
        sx={{
          fontSize: "18px",
          textTransform: "none",
          boxShadow: 0,
          bgcolor: "#DC3545",
          color: "white",
          "&.Mui-disabled": {
            bgcolor: "#F1B0B7",
            color: "white",
          },
        }}
        variant="contained"
      >
        Delete
      </Button>
    </>
  );
};

export default DeleteButton;
