import React, { useState, useEffect } from "react";
import { useCurrentUser } from "@/Context/Context";
import { useRouter } from "next/router";
import ViewButton from "@/components/Buttons/ViewButton";
import EmailCopy from "@/components/serveries/EmailCopy";
import TablePagination from "./TablePagination";
import StatusChip from "@/components/serveries/StatusChip";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Box,
  Avatar,
  TableSortLabel,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const UserTable = ({
  data,
  onSelectRows,
  search,
  resetSelection,
  onResetComplete,
}) => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const userRole = currentUser.role;
  const [selectedId, setSelectedId] = useState([]);

  // for Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const paginatedData = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "#D4EDDA";
      case "Pending":
        return "#FFF3CD";
      case "Locked":
        return "#F8D7DA";
      case "Inactive":
        return "#E7E8EA";
      default:
        return "#757575";
    }
  };

  const handleCheckboxClick = (event, id) => {
    event.stopPropagation();
    const newSelected = selectedId.includes(id)
      ? selectedId.filter((item) => item !== id)
      : [...selectedId, id];

    setSelectedId(newSelected);
    onSelectRows(newSelected);
  };

  useEffect(() => {
    if (resetSelection) {
      setSelectedId([]);
      onSelectRows([]);
      onResetComplete();
    }
  }, [resetSelection]);

  const headCells = [
    { id: "id", label: "ID" },
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action" },
  ];

  return (
    <>
      {paginatedData
        .filter((item) => {
          return item.firstName.toLowerCase().includes(search.toLowerCase());
        })
        .map((row, index) => {
          const isItemSelected = selectedId.includes(row.id);
          return (
            <Card
              onClick={() => router.push(`/users/view/${row.id}`)}
              key={index}
              sx={{
                display: { xs: "block", lg: "none" },
                mb: "19px",
                minHeight: "274px",
              }}
            >
              <CardContent sx={{ px: "0px", pt: "13px" }}>
                {userRole !== "User" && (
                  <>
                    <Grid
                      container
                      size={12}
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ px: "18px" }}
                    >
                      <Grid item="true">
                        <Checkbox
                          checked={isItemSelected}
                          onClick={(event) =>
                            handleCheckboxClick(event, row.id)
                          }
                        />
                      </Grid>
                    </Grid>
                    <Divider />
                  </>
                )}
                <Grid
                  container
                  size={12}
                  display="flex"
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mx: "10px" }}
                  mt="20px"
                >
                  <Grid item="true">
                    <StatusChip label={1 + index} />
                  </Grid>
                  <Grid item="true">
                    <Avatar
                      alt={`${row.firstName} ${row.lastName}`}
                      src={row.imageUrl}
                      sx={{ width: 80, height: 80, mb: "9px" }}
                    />
                  </Grid>
                  <Grid item="true">
                    <StatusChip
                      label={row.status}
                      statuscolor={getStatusColor(row.status)}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="column"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item="true">
                    <Typography fontSize="24px" fontWeight="bold">
                      {row.firstName}
                      {row.lastName}
                    </Typography>
                  </Grid>
                  <Grid item="true" size={12}>
                    <Divider orientation="horizontal" />
                  </Grid>
                  <Grid item="true">
                    <Typography fontSize="18px" color="#808080" my="5px">
                      {row.email}
                    </Typography>
                  </Grid>
                  <Grid item="true">
                    <Typography fontSize="18px" color="#808080">
                      {row.phoneNumber}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          );
        })}
      <TableContainer
        component={Paper}
        sx={{
          display: { xs: "none", lg: "block" },
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ borderBottom: "2px #343A40 solid" }}>
              {userRole !== "User" && (
                <TableCell padding="checkbox">
                  <Checkbox color="primary" />
                </TableCell>
              )}
              {headCells.map((headCell) => {
                return (
                  <TableCell key={headCell.id}>
                    <TableSortLabel
                      sx={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData
              .filter((item) => {
                return item.firstName
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((row, index) => {
                const isItemSelected = selectedId.includes(row.id);
                return (
                  <TableRow
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ borderBottom: "1px #DDE1E6 solid" }}
                  >
                    {userRole !== "User" && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onClick={(event) =>
                            handleCheckboxClick(event, row.id)
                          }
                        />
                      </TableCell>
                    )}
                    <TableCell sx={{ fontSize: "21px", fontWeight: "bold" }}>
                      000{index + 1}
                    </TableCell>
                    <TableCell sx={{ fontSize: "19px" }}>
                      {row.firstName}
                    </TableCell>
                    <TableCell sx={{ fontSize: "19px" }}>
                      {row.lastName}
                    </TableCell>
                    <TableCell sx={{ fontSize: "19px", pr: 0 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "nowrap",
                          alignItems: "center",
                          gap: "4%",
                        }}
                      >
                        {row.email}
                        <EmailCopy email={row.email} />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: "19px" }}>
                      {row.phoneNumber}
                    </TableCell>
                    <TableCell align="left" sx={{ pl: "0px" }}>
                      <StatusChip
                        label={row.status}
                        statuscolor={getStatusColor(row.status)}
                      />
                    </TableCell>
                    <TableCell>
                      <ViewButton path={`/users/view/${row.id}`} />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination Component */}
      <TablePagination
        data={data}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </>
  );
};

export default UserTable;
