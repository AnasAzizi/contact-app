import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { ToggleFavorite } from "@/pages/api/contact";
import { CurrnetUserContext } from "@/Context/Context";
import TablePagination from "./TablePagination";
import StatusChip from "./StatusChip";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Checkbox,
  Paper,
  Box,
  Avatar,
  TableSortLabel,
  Card,
  CardContent,
  Divider,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";

const ContactTable = ({
  data,
  onSelectRows,
  search,
  resetSelection,
}) => {
  const router = useRouter();
  const currentUser = useContext(CurrnetUserContext);
  const userRole = currentUser.currentUser.role;

  const [selectedId, setSelectedId] = useState([]);
  const [starred, setStarred] = useState({});
  const [tooltipText, setTooltipText] = useState("Copy");

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

  const { mutateAsync: ToggleFavoriteMutate } = useMutation({
    mutationFn: (id) => ToggleFavorite(id),
  });

  const handleCheckboxClick = (event, id) => {
    event.stopPropagation();
    const newSelected = selectedId.includes(id)
      ? selectedId.filter((item) => item !== id)
      : [...selectedId, id];

    setSelectedId(newSelected);
    onSelectRows(newSelected);
  };

  const handleClickIcon = () => {
    setTooltipText("Copied!");
    setTimeout(() => setTooltipText("Copy"), 1000);
  };

  const handleStarClick = (id) => {
    setStarred((prevStarred) => ({
      [id]: !prevStarred[id],
    }));
    ToggleFavoriteMutate(id);
  };

  const headCells = [
    { id: "id", label: "ID" },
    ...(userRole !== "User" ? [{ id: "favorite", label: "Favorite" }] : []),
    { id: "image", label: "Image" },
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action" },
  ];

  useEffect(() => {
    if (resetSelection) {
      setSelectedId([]);
      onSelectRows([]);
    }
  }, [resetSelection]);

  return (
    <>
      {/* for mobile version */}
      {paginatedData
        .filter((item) => {
          return item.firstName.includes(search);
        })
        .map((row, index) => {
          const isItemSelected = selectedId.includes(row.id);
          return (
            <Card
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
                      <Grid item="true">
                        <Button onClick={() => handleStarClick(row.id)}>
                          {starred[row.id] ? (
                            <StarOutlinedIcon sx={{ fontSize: "35px" }} />
                          ) : (
                            <StarBorderOutlinedIcon
                              sx={{ fontSize: "35px", color: "black" }}
                            />
                          )}
                        </Button>
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
                      {row.firstName} {row.lastName}
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
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={
                    headCell.id === "email"
                      ? "center"
                      : userRole !== "User"
                      ? "center"
                      : "left"
                  }
                >
                  <TableSortLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData
              .filter((item) => {
                return item.firstName.includes(search);
              })
              .map((row) => {
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
                      {row.id}
                    </TableCell>
                    {userRole !== "User" && (
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
                    )}
                    <TableCell>
                      <Avatar
                        alt={`${row.firstName} ${row.lastName}`}
                        src={row.imageUrl}
                        sx={{ width: 58, height: 58 }}
                      />
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
                        <Tooltip
                          slotProps={{
                            tooltip: {
                              sx: {
                                bgcolor: "white",
                                color: "black",
                                fontSize: "16px",
                              },
                            },
                          }}
                          title={tooltipText}
                          placement="top"
                        >
                          <IconButton
                            onClick={() => {
                              navigator.clipboard.writeText(row.email);
                              handleClickIcon();
                            }}
                          >
                            <FileCopyOutlinedIcon
                              sx={{
                                cursor: "pointer",
                                fontSize: "18px",
                              }}
                            />
                          </IconButton>
                        </Tooltip>
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
                      <Button
                        onClick={() => router.push(`/contacts/view/${row.id}`)}
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
      <TablePagination
        data={data}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </>
  );
};

export default ContactTable;
