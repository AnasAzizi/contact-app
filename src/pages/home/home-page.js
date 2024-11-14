import React from "react";
import NavBar from "@/components/NavBar";
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
  const data = [
    { name: "Adam Smith", date: "01 Jan 2022", action: "Add", user: "Noor", color: "#00AC69" },
    { name: "Ronald Markson", date: "01 Jan 2022", action: "Delete", user: "David", color: "#FC766A" },
    { name: "David Walso", date: "01 Jan 2022", action: "Update", user: "Chris", color: "#F4A100" },
    { name: "Adam Waldo", date: "01 Jan 2022", action: "Access", user: "Noor", color: "#0061F2" },
    { name: "John Bullak", date: "01 Jan 2022", action: "Email sent", user: "Noor", color: "#17C3B2" },
    { name: "Matt Adams", date: "01 Jan 2022", action: "Add", user: "Noor", color: "#00AC69" },
  ];

  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <Typography mt={6} mb={1} variant="h5" color="black">
          Statistical Dashboard
        </Typography>
        <Divider />
        <Grid mt="50px" container>
          <Grid size={6}>
            <Grid container columnSpacing="72px" rowSpacing="68px">
              <Grid size={6}>
                <Card
                  sx={{
                    width: "302px",
                    height: "163px",
                    bgcolor: "#1ABC9C",
                    color: "#ffffff",
                    fontSize: "40px",
                    pb: "21px",
                    p: "0",
                  }}
                >
                  <CardContent>
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
                    <Typography sx={{ opacity: "50%", ml: "8px", mb: "21px" }}>
                      Active
                    </Typography>
                    <Typography
                      sx={{ opacity: "50%", display: "flex", mb: "21px" }}
                    >
                      <NorthIcon /> 3% from last month
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={6}>
                <Card
                  sx={{
                    width: "302px",
                    height: "163px",
                    bgcolor: "#FC766A",
                    color: "#ffffff",
                    fontSize: "40px",
                    pb: "21px",
                    p: "0",
                  }}
                >
                  <CardContent>
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
                    <Typography sx={{ opacity: "50%", ml: "8px", mb: "21px" }}>
                      Active
                    </Typography>
                    <Typography
                      sx={{ opacity: "50%", display: "flex", mb: "21px" }}
                    >
                      <NorthIcon /> 3% from last month
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={6}>
                <Card
                  sx={{
                    width: "302px",
                    height: "163px",
                    bgcolor: "#2C3E50",
                    color: "#ffffff",
                    fontSize: "40px",
                    pb: "21px",
                    p: "0",
                  }}
                >
                  <CardContent>
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
                    <Typography sx={{ opacity: "50%", ml: "8px", mb: "21px" }}>
                      Active
                    </Typography>
                    <Typography
                      sx={{ opacity: "50%", display: "flex", mb: "21px" }}
                    >
                      <NorthIcon /> 3% from last month
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={6}>
                <Card
                  sx={{
                    width: "302px",
                    height: "163px",
                    bgcolor: "#5B84B1",
                    color: "#ffffff",
                    fontSize: "40px",
                    pb: "21px",
                    p: "0",
                  }}
                >
                  <CardContent>
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
                    <Typography sx={{ opacity: "50%", ml: "8px", mb: "21px" }}>
                      Active
                    </Typography>
                    <Typography
                      sx={{ opacity: "50%", display: "flex", mb: "21px" }}
                    >
                      <NorthIcon /> 3% from last month
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid size={6}></Grid>
          </Grid>

          <Grid size={6}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650, pt: "34px", pb: "46px" }}
                size="small"
              >
                {/* padding not working */}
                <TableBody>
                  {data.map((data) => (
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
                          ml:"38px",
                          display: "flex",
                          justifyContent: "flex-start",
                          gap:"9px",
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
                            bgcolor: data.color,
                          }}
                        ></Box>
                        {data.action}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="right"
                        sx={{ border: "none", color: "black" }}
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
