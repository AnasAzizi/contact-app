import React, { useState } from "react";
import { Activities } from "@/pages/api/contact";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Loader from "@/components/Loader";
import SecondNavBar from "@/components/SecondNavBar";
import ActiveTable from "@/components/ActiveTable";
import TablePagination from "@/components/TablePagination";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
} from "@mui/material";

const ActivitiesPage = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["activities"],
    queryFn: Activities,
  });

  if (!data) {
    return <Loader />;
  }

  const rowsPerPage = 10;
  const paginatedData = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <>
      <Head>
        <title>Activities</title>
      </Head>
      <Container maxWidth="xl">
        <SecondNavBar path={router.pathname} />
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
            <ActiveTable data={paginatedData} />
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
