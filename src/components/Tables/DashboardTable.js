import React from "react";
import Loader from "@/components/layouts/Loader";
import PageTitle from "@/components/serveries/PageTitle";
import {
  TableBody,
  TableCell,
  TableRow,
  Chip,
  Typography,
  Box,
  Table,
  TableContainer,
  Paper,
} from "@mui/material";

const DashboardTable = ({ data }) => {
  if (!data) {
    return <Loader />;
  }

  const reversedData = [...data].reverse();
  const displayedData = reversedData.slice(0, 6);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toISOString().split("T")[0];
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
    <>
      <PageTitle path="/home/activities" title="Latest activities" />
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          px: { md: "40px" },
          py: "20px",
          pl: { xs: "40px" },
          border: "1px solid #E0E0E0",
        }}
      >
        <Table>
          <TableBody>
            {displayedData.map((item, index) => (
              <TableRow key={index}>
                <TableCell
                  scope="row"
                  sx={{
                    borderBottom: "none",
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
                    borderBottom: "none",
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
                    borderBottom: "none",
                    width: "85px",
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
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
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    display: { xs: "none", md: "table-cell" },
                    borderBottom: "none",
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
        </Table>
      </TableContainer>
    </>
  );
};

export default DashboardTable;
