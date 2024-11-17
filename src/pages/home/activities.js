import  { useState } from "react";
import NavBar from "@/components/NavBar";
import React from "react";
import Data from "@/data/LatestActivitiesData.json";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
  Container,
  Pagination,
} from "@mui/material";
import SecondNavBar from "@/components/SecondNavBar";

const activities = () => {
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const paginatedData = Data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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
      <NavBar />
      <Container maxWidth="xl">
        <SecondNavBar path="Home / Activities" />
        <TableContainer component={Paper} sx={{ px: { md: "40px" } }}>
          <Table>
            <TableHead>
              <TableRow sx={{ borderBottom: "2px solid #343A40" }}>
                <TableCell sx={{ fontWeight: "bold", fontSize: "19px" }}>
                  Contact
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "19px",
                    px: 0,
                    width: "165px",
                    textAlign: "start",
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "19px",
                    px: 0,
                    width: "115px",
                  }}
                >
                  Action
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "19px",
                    pr: 0,
                    width: "70px",
                  }}
                >
                  By
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Data.map((data) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }} //? p or m for tableRow
                >
                  <TableCell scope="row" sx={{ fontSize: "20px" }}>
                    {data.name}
                  </TableCell>
                  <TableCell align="left" sx={{ px: 0 }}>
                    <Typography sx={{ fontSize: "14px", opacity: "40%" }}>
                      {data.date}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ px: 0 }}>
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
                          bgcolor: getStatusColor(data.action),
                          mr: 1,
                        }}
                      />
                      <Typography sx={{ fontSize: "14px", opacity: "40%" }}>
                        {data.action}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      sx={{
                        borderRadius: "2px",
                        bgcolor: "#EEEEEE",
                        fontSize: "12px",
                        minWidth: "54px",
                      }}
                      label={data.user}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
        component="div"
        sx={{ display: { xs: "none", md: "flex" }, justifyContent: "flex-end" }}
      >
        <Pagination
          count={Math.ceil(Data.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          // renderItem=""
          sx={{
            marginTop: 2,
            "& .MuiPaginationItem-root": {
              borderColor: "#DEE2E6",
              borderRadius: 0,
              mx: 0,
              color: "#4E73DF",
              height: "47px",
              width: "51px",
              // fontSize: "18px"
            },
            "& .Mui-selected": {
              backgroundColor: "#4E73DF",
              color: "white",
            },
          }}
        />
      </Box>
      </Container>
    </>
  );
};

export default activities;
