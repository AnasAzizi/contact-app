import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Image from "next/image";
import NorthIcon from "@mui/icons-material/North";

const DashboardCard = ({ bgColor, imageSrc, text,count}) => {
  return (
    <Card
      sx={{
        bgcolor: bgColor,
        width: "100%",
        color: "#ffffff",
        fontSize: "40px",
      }}
    >
      <CardContent sx={{ "&:last-child": { pb: 0 } }}>
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 0,
          }}
        >
          <Typography fontSize={40}>{count}</Typography>
          <Image
            src={imageSrc}
            alt="Icon"
            width={51}
            height={51}
            priority={true}
          />
        </Box>
        <Typography
          noWrap
          sx={{
            opacity: "50%",
            ml: "8px",
            fontSize: "20px",
          }}
        >
          {text}
        </Typography>
        <Typography
          sx={{
            opacity: "50%",
            display: "flex",
            mb: "21px",
            mt: "21px",
          }}
        >
          <NorthIcon /> 3% from last month
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
