import React, { useState } from "react";
import { Activities } from "@/pages/api/contact";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
} from "@mui/material";
import SecondNavBar from "@/components/SecondNavBar";
import ActiveTable from "@/components/ActiveTable";
import TablePagination from "@/components/TablePagination";

const ActivitiesPage = () => {
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["activities"],
    queryFn: Activities,
  });

  if (!data) {
    return <div>No data available.</div>;
  }

  const rowsPerPage = 10;
  const paginatedData = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <>
      <Container maxWidth="xl">
        <SecondNavBar path="Home / Activities" />
        <TableContainer
          component={Paper}
          sx={{
            px: { md: "40px" },
            pt: "20px",
            pl: { xs: "40px" },
            "& .MuiTableBody-root": {
              // my:5
            },
          }}
        >
          <Table>
            <TableHead
              sx={{ display: { xs: "none", md: "table-header-group" } }}
            >
              <TableRow sx={{ borderBottom: "2px solid #343A40", mb: "200px" }}>
                <TableCell sx={{ fontWeight: "bold", fontSize: "19px", pl: 0 }}>
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
            <ActiveTable data={paginatedData} line={true} />
          </Table>
        </TableContainer>
        <TablePagination
          data={data}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </Container>
    </>
  );
};

export default ActivitiesPage;
