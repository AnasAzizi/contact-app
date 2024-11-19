import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Checkbox,
  Paper,
  Pagination,
  Box,
  Avatar,
  TableSortLabel,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import FeedIcon from "@mui/icons-material/Feed";
import { useRouter } from "next/router";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import Grid from "@mui/material/Grid2";

const StatusChip = styled(Chip)(({ statuscolor }) => ({
  backgroundColor: statuscolor,
  borderRadius: "4px",
  width: "93px",
  fontSize: "16px",
}));

const UserTable = ({ data, favorite }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [selected, setSelected] = useState([]);
  const [starred, setStarred] = useState({});
  const router = useRouter();

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
        return "#6C757D";
      default:
        return "#757575";
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = paginatedData.map((n) => n.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleCheckboxClick = (event, id) => {
    event.stopPropagation(); // Prevent row selection when clicking checkbox
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleStarClick = (id) => {
    setStarred((prevStarred) => ({
      ...prevStarred,
      [id]: !prevStarred[id], // Toggle the favorite status of the clicked row
    }));
  };

  const headCells = [
    { id: "id", label: "ID" },
    { id: "favorite", label: "Favorite" },
    { id: "image", label: "Image" },
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action" },
  ];

  return (
    <>
      {data.map((row, index) => (
        <Card
          key={index}
          sx={{
            display: { xs: "block", lg: "none" },
            mb: "19px",
            minHeight: "274px",
          }}
        >
          <CardContent sx={{ px: "0px", pt: "13px" }}>
            <Grid
              container
              size={12}
              justifyContent="space-between"
              alignItems="center"
              sx={{ px: "18px" }}
            >
              <Grid item="true">
                <Checkbox size="medium" />
              </Grid>
              <Grid item="true">
                <StarBorderOutlinedIcon
                  sx={{ fontSize: "30px", color: "#707070" }}
                />
              </Grid>
            </Grid>
            <Divider />
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
                <StatusChip label={`#${row.id}`} />
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
                  {row.phone}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
      <TableContainer
        component={Paper}
        sx={{
          display: { xs: "none", lg: "block" },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selected.length === paginatedData.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              {headCells.map((headCell) => {
                if (headCell.id === "favorite" || headCell.id === "image") {
                  if (favorite) {
                    return (
                      <TableCell key={headCell.id} align="center">
                        <TableSortLabel
                          sx={{ fontSize: "20px", fontWeight: "bold" }}
                        >
                          {headCell.label}
                        </TableSortLabel>
                      </TableCell>
                    );
                  }
                } else {
                  return (
                    <TableCell
                      key={headCell.id}
                      align={
                        favorite && headCell.id === "email"
                          ? "center"
                          : undefined
                      }
                    >
                      <TableSortLabel
                        sx={{ fontSize: "20px", fontWeight: "bold" }}
                      >
                        {headCell.label}
                      </TableSortLabel>
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row) => {
              const isItemSelected = selected.includes(row.id);
              return (
                <TableRow hover key={row.id} selected={isItemSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      onClick={(event) => handleCheckboxClick(event, row.id)}
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: "21px", fontWeight: "bold" }}>
                    {row.id}
                  </TableCell>
                  {favorite && (
                    <>
                      <TableCell>
                        <Button onClick={() => handleStarClick(row.id)}>
                          {starred[row.id] ? (
                            <StarOutlinedIcon sx={{ fontSize: "35px" }} />
                          ) : (
                            <StarBorderOutlinedIcon
                              sx={{ fontSize: "35px", color: "black" }}
                            />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Avatar
                          alt={`${row.firstName} ${row.lastName}`}
                          src={row.imageUrl}
                          sx={{ width: 58, height: 58 }}
                        />
                      </TableCell>
                    </>
                  )}
                  <TableCell sx={{ fontSize: "19px" }}>
                    {row.firstName}
                  </TableCell>
                  <TableCell sx={{ fontSize: "19px" }}>
                    {row.lastName}
                  </TableCell>
                  <TableCell sx={{ fontSize: "19px" }}>{row.email}</TableCell>
                  {/* <TableCell>
                    <FeedIcon />
                  </TableCell> */}
                  <TableCell sx={{ fontSize: "19px" }}>{row.phone}</TableCell>
                  <TableCell align="left" sx={{ pl: "0px" }}>
                    <StatusChip
                      label={row.status}
                      statuscolor={getStatusColor(row.status)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => router.push("/contacts/view")}
                      variant="contained"
                      sx={{
                        bgcolor: "#4E73DF",
                        borderRadius: "5px",
                        textTransform: "none",
                        fontSize: "16px",
                        boxShadow: 0,
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Component */}
      <Box
        component="div"
        sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
      >
        <Pagination
          count={Math.ceil(data.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              borderColor: "#DEE2E6",
              borderRadius: 0,
              mx: 0,
              color: "#4E73DF",
              height: "47px",
              width: "51px",
              fontSize: "18px",
            },
            "& .Mui-selected": {
              backgroundColor: "#4E73DF",
              color: "white",
            },
          }}
        />
      </Box>
    </>
  );
};

export default UserTable;
