import React from "react";
import NavBar from "@/components/NavBar";
import Data from "@/data/LatestActivitiesData.json";
import Box from "@mui/material/Box";
import { Container, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import NorthIcon from "@mui/icons-material/North";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper"; //! border of table like shadow
import Chip from "@mui/material/Chip";

const HomePage = () => {
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
        <Typography mt={6} mb={1} variant="h5" color="black">
          Statistical Dashboard
        </Typography>
        <Divider />
        <Grid
          mt="50px"
          container
          direction={{ xs: "column", md: "row" }}
          size={12}
          columnSpacing={9}
        >
          <Grid
            container
            size={{ xs: 12, md: 6 }}
            direction={{ xs: "column", md: "row" }}
            columnSpacing="72px"
            rowSpacing="68px"
          >
            <Grid size={6}>
              <Card
                sx={{
                  minWidth: { xs: "400px", md: "0px" },
                  bgcolor: "#1ABC9C",
                  color: "#ffffff",
                  fontSize: "40px",
                }}
              >
                <CardContent sx={{ pb: 0, "&:last-child": { pb: 0 } }}>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      pb: 0,
                    }}
                  >
                    <Typography fontSize={40}>101</Typography>
                    <ArrowCircleLeftRoundedIcon
                      sx={{ fontSize: "51px", opacity: "50%" }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      opacity: "50%",
                      ml: "8px",
                      fontSize: "20px",
                    }}
                  >
                    Active
                  </Typography>
                  <Typography
                    sx={{ opacity: "50%", display: "flex", mb: "21px",mt:"21px" }}
                  >
                    <NorthIcon /> 3% from last month
                  </Typography>
                </CardContent>
              </Card>

            </Grid>
            <Grid size={6}>
              <Card
                sx={{
                  minWidth: { xs: "400px", md: "0px" },


                  bgcolor: "#FC766A",
                  color: "#ffffff",
                  fontSize: "40px",
                }}
              >
                <CardContent  sx={{ pb: 0, "&:last-child": { pb: 0 } }}>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 0,
                    }}
                  >
                    <Typography fontSize={40}>101</Typography>
                    <ArrowCircleLeftRoundedIcon
                      sx={{ fontSize: "51px", opacity: "50%" }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      opacity: "50%",
                      ml: "8px",
                      fontSize: "20px",

                    }}
                  >
                    Inactive
                  </Typography>
                  <Typography
                    sx={{ opacity: "50%", display: "flex", mb: "21px",mt:"21px" }}
                  >
                    <NorthIcon /> 3% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={6}>
              <Card
                sx={{
                  minWidth: { xs: "400px", md: "0px" },
                  bgcolor: "#2C3E50",
                  color: "#ffffff",
                  fontSize: "40px",
                }}
              >
                <CardContent  sx={{ pb: 0, "&:last-child": { pb: 0 } }}>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 0,
                    }}
                  >
                    <Typography fontSize={40}>101</Typography>
                    <ArrowCircleLeftRoundedIcon
                      sx={{ fontSize: "51px", opacity: "50%" }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      opacity: "50%",
                      ml: "8px",
                      fontSize: "20px",
                    }}
                  >
                    With email
                  </Typography>
                  <Typography
                    sx={{ opacity: "50%", display: "flex", mb: "21px",mt:"21px" }}
                  >
                    <NorthIcon /> 3% from last month
                  </Typography>
                </CardContent >
              </Card>
            </Grid>
            <Grid size={6}>
              <Card
                sx={{
                  minWidth: { xs: "400px", md: "0px" },
                  bgcolor: "#5B84B1",
                  color: "#ffffff",
                  fontSize: "40px",
                }}
              >
                <CardContent  sx={{ pb: 0, "&:last-child": { pb: 0 } }}>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 0,
                    }}
                  >
                    <Typography fontSize={40}>101</Typography>
                    <ArrowCircleLeftRoundedIcon
                      sx={{ fontSize: "51px", opacity: "50%" }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      opacity: "50%",
                      ml: "8px",
                      fontSize: "20px",

                    }}
                  >
                    Without email
                  </Typography>
                  <Typography
                    sx={{ opacity: "50%", display: "flex", mb: "21px",mt:"21px" }}
                  >
                    <NorthIcon /> 3% from last month
                  </Typography>
                </CardContent >
              </Card>
            </Grid>
          </Grid>

          <Grid item="true" size={{ xs: 12, md: 6 }} mt={{xs:"40px",md:0}}>
            <Card
              sx={{
                height: "72px",
                bgcolor: "#F7F7F7",
                color: "#000000",
                fontSize: "26px",
              }}
            >
              <Typography 
              sx={{fontSize:"26px",
                mt:"20px",
                ml:"40px",
                mt:"18px"
              }}
              >
              Latest activities
              </Typography>
            </Card>
            <TableContainer component={Paper} sx={{px:{md:"40px"}}}>
              <Table
                sx={{ mt: "34px"}}
              >
                <TableBody>
                  {Data.map((data) => (
                    <TableRow key={data.name} sx={{ border: "none" }}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: "none", fontSize: "20px" }}
                      >
                        {data.name}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="right"
                        sx={{
                          border: "none",
                          color: "black",
                          opacity: "40%",
                          fontSize: "14px",
                        }}
                      >
                        {data.date}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="right"
                        sx={{
                          pr:"0px",
                          display: "flex",
                          justifyContent: "flex-start",
                          gap: "9px",
                          alignItems: "center",
                          flexDirection: "row",
                          border: "none",
                          color: "black",
                          opacity: "40%",
                          fontSize: "14px",
                        }}
                      >
                        <Box
                          component="div"
                          sx={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50px",
                            bgcolor: getStatusColor(data.action),
                          }}
                        ></Box>
                        {data.action}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="right"
                        sx={{ border: "none", color: "black",pl:"0px" }}
                      >
                        <Chip
                          sx={{
                            borderRadius: "2px",
                            bgcolor: "#EEEEEE",
                            fontSize: "14px",
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
