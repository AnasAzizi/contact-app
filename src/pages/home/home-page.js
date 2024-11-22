import React from "react";
import Image from "next/image";
import SecondNavBar from "@/components/SecondNavBar";
import Data from "@/data/LatestActivitiesData.json";
import Link from "next/link";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableContainer,
  Paper,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import NorthIcon from "@mui/icons-material/North";
import ActiveTable from "@/components/ActiveTable";

const HomePage = () => {
  return (
    <>
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
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  width: "100%",
                  bgcolor: "#1ABC9C",
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
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  width: "100%",
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
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  width: "100%",
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
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  bgcolor: "#5B84B1",
                  width: "100%",
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
                    noWrap
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
              <Link href="/home/activities" passHref>
                <Typography
                  sx={{ fontSize: "26px", mt: "20px", ml: "40px", mt: "18px" }}
                >
                  Latest activities
                </Typography>
              </Link>
            </Card>
            <TableContainer
              component={Paper}
              sx={{
                boxShadow: "none",
                px: { md: "40px" },
                py: "20px",
                pl: { xs: "40px" },
                border: "1px solid #E0E0E0",
              }}
            >
              <Table>
                <ActiveTable line={false} data={Data} />
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
