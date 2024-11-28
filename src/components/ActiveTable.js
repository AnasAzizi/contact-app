import React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  Chip,
  Typography,
  Box,
} from "@mui/material";

const ActiveTable = ({ line, data, rowLimit }) => {
  const reversedData = [...data].reverse();
  const displayedData = rowLimit
    ? reversedData.slice(0, rowLimit)
    : reversedData;

  const formatDate = (timestamp) => {
    return new Date(timestamp).toISOString().split("T")[0]; // Extract YYYY-MM-DD
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Add":
        return "#00AC69";
      case "Delete":
        return "#FC766A";
      case "Update":
        return "#F4A100";
      case "Access":
        return "#0061F2";
      case "Email sent":
        return "#17C3B2";
      default:
        return "#757575";
    }
  };

  return (
    <TableBody>
      {displayedData.map((item, index) => (
        <TableRow key={index}>
          <TableCell
            scope="row"
            sx={{
              borderBottom: line ? "1px solid #F5F5F5" : "none",
              fontSize: { xs: "14px", md: "13px", lg: "20px" },
              py: 0,
              px: 0,
            }}
          >
            <Typography
              sx={{
                display: { xs: "block", md: "table-cell" },
                fontSize: "20px",
              }}
            >
              {item.contact}
            </Typography>
            <Typography
              sx={{
                display: { xs: "table-cell", md: "none" },
                fontSize: "14px",
                opacity: "40%",
              }}
            >
              {formatDate(item.timestamp)}
            </Typography>
          </TableCell>
          <TableCell
            align="left"
            sx={{
              px: 0,
              width: "115px",
              borderBottom: line ? "1px solid #F5F5F5" : "none",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                opacity: "40%",
                display: { xs: "none", md: "table-cell" },
              }}
            >
              {formatDate(item.timestamp)}
            </Typography>
            <Box
              display={{ xs: "flex", md: "none" }}
              alignItems="center"
              justifyContent="flex-start"
              mb="7px"
            >
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50px",
                  bgcolor: getStatusColor(item.action),
                  mr: 1,
                }}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  opacity: "40%",
                }}
              >
                {item.action}
              </Typography>
            </Box>
            <Chip
              sx={{
                borderRadius: "2px",
                textAlign: "center",
                display: { xs: "table-cell", md: "none" },
                bgcolor: "#EEEEEE",
                fontSize: "12px",
                minWidth: { xs: "84px", md: "54px" },
                height: "20px",
              }}
              label={item.by}
            />
          </TableCell>
          <TableCell
            align="left"
            sx={{
              display: { xs: "none", md: "table-cell" },
              px: 0,
              borderBottom: line ? "1px solid #F5F5F5" : "none",
              width: "85px",
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50px",
                  bgcolor: getStatusColor(item.action),
                  mr: 1,
                }}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  opacity: "40%",
                }}
              >
                {item.action}
              </Typography>
            </Box>
          </TableCell>
          <TableCell
            align="right"
            sx={{
              display: { xs: "none", md: "table-cell" },
              borderBottom: line ? "1px solid #F5F5F5" : "none",
              width: "85px",
              pr: { xs: 2, md: 0 },
            }}
          >
            <Chip
              sx={{
                borderRadius: "2px",
                bgcolor: "#EEEEEE",
                fontSize: "12px",
                minWidth: "54px",
                maxHeight: "20px",
              }}
              label={item.by}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ActiveTable;
