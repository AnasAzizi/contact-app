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
  Card,
  CardContent,
  Divider,
  Typography,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import FeedIcon from "@mui/icons-material/Feed";
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
  const [selectedStar, setSelectedStar] = useState();
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

  return (
    <>
      {data.map((row, index) => (
        <Card
          key={index}
          sx={{
            display: { xs: "block", md: "none" },
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
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: "2px solid #343A40" }}>
                <Checkbox defaultChecked={false} />
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "2px solid #343A40",
                  fontWeight: "bold",
                  fontSize: "19px",
                }}
              >
                ID
              </TableCell>
              {favorite && (
                <>
                  <TableCell
                    sx={{
                      borderBottom: "2px solid #343A40",
                      fontWeight: "bold",
                      fontSize: "19px",
                    }}
                  >
                    Favorite
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "2px solid #343A40",
                      fontWeight: "bold",
                      fontSize: "19px",
                    }}
                  >
                    Image
                  </TableCell>
                </>
              )}
              <TableCell
                sx={{
                  borderBottom: "2px solid #343A40",
                  fontWeight: "bold",
                  fontSize: "19px",
                }}
              >
                First Name
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "2px solid #343A40",
                  fontWeight: "bold",
                  fontSize: "19px",
                }}
              >
                Last Name
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "2px solid #343A40",
                  fontWeight: "bold",
                  fontSize: "19px",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{ borderBottom: "2px solid #343A40", px: 0 }}
              ></TableCell>
              <TableCell
                align="center"
                sx={{
                  borderBottom: "2px solid #343A40",
                  fontWeight: "bold",
                  fontSize: "19px",
                }}
              >
                Phone
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  borderBottom: "2px solid #343A40",
                  fontWeight: "bold",
                  fontSize: "19px",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "2px solid #343A40",
                  fontWeight: "bold",
                  fontSize: "19px",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{ border: "none", fontSize: "19px" }}>
                  <Checkbox defaultChecked={false} />
                </TableCell>
                <TableCell
                  sx={{ border: "none", fontSize: "19px", fontWeight: "bold" }}
                >
                  {row.id}
                </TableCell>
                {favorite && (
                  <>
                    <TableCell
                      sx={{
                        border: "none",
                      }}
                    >
                      {selectedStar ? (
                        <StarOutlinedIcon sx={{ fontSize: "35px" }} />
                      ) : (
                        <StarBorderOutlinedIcon sx={{ fontSize: "35px" }} />
                      )}
                    </TableCell>
                    <TableCell sx={{ border: "none", fontSize: "35px" }}>
                      <Avatar
                        alt={`${row.firstName} ${row.lastName}`}
                        src={row.imageUrl}
                        sx={{ width: 58, height: 58 }}
                      />
                    </TableCell>
                  </>
                )}

                <TableCell sx={{ border: "none", fontSize: "19px" }}>
                  {row.firstName}
                </TableCell>
                <TableCell sx={{ border: "none", fontSize: "19px" }}>
                  {row.lastName}
                </TableCell>
                <TableCell
                  sx={{
                    border: "none",
                    fontSize: "19px",
                    px: 0,
                    maxWidth: "200px",
                  }}
                >
                  {row.email}
                </TableCell>
                <TableCell sx={{ border: "none", fontSize: "19px", px: 0 }}>
                  <FeedIcon />
                </TableCell>

                <TableCell
                  align="right"
                  sx={{ border: "none", fontSize: "19px" }}
                >
                  {row.phone}
                </TableCell>
                <TableCell align="center" sx={{ border: "none" }}>
                  <StatusChip
                    label={row.status}
                    statuscolor={getStatusColor(row.status)}
                  />
                </TableCell>
                <TableCell sx={{ border: "none" }}>
                  <Button
                    sx={{
                      bgcolor: "#4E73DF",
                      borderRadius: "5px",
                      textTransform: "none",
                      fontSize: "16px",
                    }}
                    variant="contained"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Component */}
      <Box
        component="div"
        sx={{ display: { xs: "none", md: "flex" }, justifyContent: "flex-end" }}
      >
        <Pagination
          count={Math.ceil(data.length / rowsPerPage)}
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
    </>
  );
};

export default UserTable;
