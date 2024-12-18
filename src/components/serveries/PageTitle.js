import React from "react";
import Link from "next/link";
import { Typography, Card } from "@mui/material";

const PageTitle = ({ title, path }) => {
  return (
    <>
      <Card
        sx={{
          height: "72px",
          bgcolor: "#F7F7F7",
          color: "#000000",
          fontSize: "24px",
        }}
      >
        <Link href={path}>
          <Typography
            sx={{
              fontSize: "26px",
              ml: "40px",
              mt: "18px",
              cursor: "default",
            }}
          >
            {title}
          </Typography>
        </Link>
      </Card>
    </>
  );
};

export default PageTitle;
