import React from "react";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import SecondNavBar from "@/components/SecondNavBar";
import Data from "@/data/LatestActivitiesData.json";
import Box from "@mui/material/Box";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Chip,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import NorthIcon from "@mui/icons-material/North";

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
        <SecondNavBar path="Statistical Dashboard" />
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
                {/* "&:last-child": { pb: 0 } for remove a padding in CardContent */}
                <CardContent sx={{ "&:last-child": { pb: 0 } }}>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography fontSize={40}>101</Typography>
                    <Image
                      src="/homePageIcons/arrow-down-circle-fill.svg"
                      alt="arrow-down Icon"
                      width={51}
                      height={51}
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
                    sx={{
                      opacity: "50%",
                      display: "flex",
                      mb: "21px",
                      mt: "21px",
                    }}
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
                <CardContent sx={{ "&:last-child": { pb: 0 } }}>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 0,
                    }}
                  >
                    <Typography fontSize={40}>101</Typography>
                    <Image
                      src="/homePageIcons/arrow-down-circle-fill.svg"
                      alt="arrow-down Icon"
                      width={51}
                      height={51}
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
                    sx={{
                      opacity: "50%",
                      display: "flex",
                      mb: "21px",
                      mt: "21px",
                    }}
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
                <CardContent sx={{ "&:last-child": { pb: 0 } }}>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 0,
                    }}
                  >
                    <Typography fontSize={40}>101</Typography>
                    <Image
                      src="/homePageIcons/email.svg"
                      alt="arrow-down Icon"
                      width={51}
                      height={51}
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
                    sx={{
                      opacity: "50%",
                      display: "flex",
                      mb: "21px",
                      mt: "21px",
                    }}
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
                  bgcolor: "#5B84B1",
                  color: "#ffffff",
                  fontSize: "40px",
                }}
              >
                <CardContent sx={{ "&:last-child": { pb: 0 } }}>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 0,
                    }}
                  >
                    <Typography fontSize={40}>101</Typography>
                    <Image
                      src="/homePageIcons/x-circle-fill.svg"
                      alt="arrow-down Icon"
                      width={51}
                      height={51}
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
                    sx={{
                      opacity: "50%",
                      display: "flex",
                      mb: "21px",
                      mt: "21px",
                    }}
                  >
                    <NorthIcon /> 3% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item="true" size={{ xs: 12, md: 6 }} mt={{ xs: "40px", md: 0 }}>
            <Card
              sx={{
                height: "72px",
                bgcolor: "#F7F7F7",
                color: "#000000",
                fontSize: "26px",
              }}
            >
              <Typography
                sx={{ fontSize: "26px", mt: "20px", ml: "40px", mt: "18px" }}
              >
                Latest activities
              </Typography>
            </Card>
            <TableContainer component={Paper} sx={{ px: { md: "40px" } }}>
              <Table>
                <TableBody>
                  {Data.slice(0, 5).map((data, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }} //? p or m for tableRow
                    >
                      <TableCell
                        scope="row"
                        sx={{ border: "none", fontSize: "20px" }}
                      >
                        {data.name}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ px: 0, border: "none", width: "115px" }}
                      >
                        <Typography sx={{ fontSize: "14px", opacity: "40%" }}>
                          {data.date}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ px: 0, border: "none", width: "85px" }}
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
                              bgcolor: getStatusColor(data.action),
                              mr: 1,
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "14px",
                              opacity: "40%",
                              border: "none",
                            }}
                          >
                            {data.action}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ border: "none", width: "85px", pl: 0 }}
                      >
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
