import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShowContact } from "@/pages/api/contact";
import { CurrnetUserContext } from "@/Context/Context";
import { useQuery } from "@tanstack/react-query";
import SecondNavBar from "@/components/SecondNavBar";
import ActiveTable from "@/components/ActiveTable";
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

const HomePage = () => {
  const { currentUser: userRole } =
    useContext(CurrnetUserContext);


  const { data: Contact } = useQuery({
    queryKey: ["contacts"],
    queryFn: ShowContact,
  });

  let counts = { Active: 0, Inactive: 0, email: 0, emailTwo: 0 };

  if (Contact) {
    counts = Contact.reduce(
      (acc, item) => {
        if (item.status === "Active") {
          acc.Active += 1;
        } else if (item.status === "Inactive") {
          acc.Inactive += 1;
        }

        if (item.email) {
          acc.email += 1;
        }
        if (item.emailTwo) {
          acc.emailTwo += 1;
        }

        return acc;
      },
      { Active: 0, Inactive: 0, email: 0, emailTwo: 0 }
    );
  }

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
                      <Typography fontSize={40}>{counts.Active}</Typography>
                      <Image
                        src="/homePageIcons/arrow-down-circle-fill.svg"
                        alt="arrow-down Icon"
                        width={51}
                        height={51}
                        priority={true}
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
                      <Typography fontSize={40}>{counts.Inactive}</Typography>
                      <Image
                        src="/homePageIcons/arrow-down-circle-fill.svg"
                        alt="arrow-down Icon"
                        width={51}
                        height={51}
                        priority={true}
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
                      <Typography fontSize={40}>{counts.Inactive}</Typography>
                      <Image
                        src="/homePageIcons/email.svg"
                        alt="arrow-down Icon"
                        width={51}
                        height={51}
                        priority={true}
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
                      <Typography fontSize={40}>{counts.emailTwo}</Typography>
                      <Image
                        src="/homePageIcons/x-circle-fill.svg"
                        alt="arrow-down Icon"
                        width={51}
                        height={51}
                        priority={true}
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
            {userRole.role !== "User" &&
             (
              <>
                <Grid
                  item="true"
                  size={{ xs: 12, md: 6 }}
                  mt={{ xs: "40px", md: 0 }}
                >
                  <Card
                    sx={{
                      height: "72px",
                      bgcolor: "#F7F7F7",
                      color: "#000000",
                      fontSize: "26px",
                    }}
                  >
                    <Link href="/home/activities">
                      <Typography
                        sx={{
                          fontSize: "26px",
                          ml: "40px",
                          mt: "18px",
                        }}
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
                      <ActiveTable line={false}  rowLimit={6} />
                    </Table>
                  </TableContainer>
                </Grid>
              </>
            )
            }
          </Grid>
        </Container>
    </>
  );
};

export default HomePage;
