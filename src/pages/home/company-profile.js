import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { GetCompanies } from "@/pages/api/companies";
import { CurrnetUserContext } from "@/Context/Context";
import Image from "next/image";
import Head from "next/head";
import SecondNavBar from "@/components/SecondNavBar";
import CustomTextField from "@/components/CustomTextField";
import Loader from "@/components/Loader";
import {
  Container,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Card,
  Select,
  Box,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import EditOffOutlinedIcon from "@mui/icons-material/EditOffOutlined";

const CompanyProfile = () => {
  const router = useRouter();
  const currentUser = useContext(CurrnetUserContext);
  const userRole = currentUser.currentUser.role;

  const { data, isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: GetCompanies,
  });

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Head>
        <title>Company Profile</title>
      </Head>
      <Container maxWidth="xl">
        <SecondNavBar path={router.pathname} />
        <Card
          sx={{
            height: "72px",
            bgcolor: "#F7F7F7",
            boxShadow: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: "23px",
              mt: "20px",
              ml: "40px",
            }}
          >
            My Profile
          </Typography>
        </Card>

        <Grid
          container
          mb="1px"
          pt="42px"
          pb="50px"
          px={{ xs: "20px", md: "75px" }}
          size={12}
          direction={{ xs: "column", md: "row" }}
          bgcolor="white"
          sx={{ boxShadow: 3 }}
          columnSpacing="50px"
        >
          <Grid
            item="true"
            size={{ xs: 12, md: 8 }}
            container
            direction={{ xs: "column", md: "row" }}
            columnSpacing="62px"
            rowSpacing="24px"
            wrap="wrap"
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Company name
              </Typography>
              <CustomTextField
                fullWidth
                name="companyName"
                defaultValue={data.companyName}
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                VAT Number
              </Typography>
              <CustomTextField
                fullWidth
                name="vatNumber"
                defaultValue={data.vatNumber}
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Street
              </Typography>
              <CustomTextField
                fullWidth
                name="streetOne"
                defaultValue={data.streetOne}
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Street 2
              </Typography>
              <CustomTextField
                fullWidth
                name="streetTwo"
                defaultValue={data.streetTwo}
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                City
              </Typography>
              <CustomTextField
                fullWidth
                name="city"
                defaultValue={data.city}
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                State
              </Typography>
              <CustomTextField
                fullWidth
                name="state"
                defaultValue={data.state}
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Zip
              </Typography>
              <CustomTextField
                fullWidth
                name="zip"
                defaultValue={data.zip}
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Country
              </Typography>
              <FormControl size="small" fullWidth disabled>
                <InputLabel>{data.country}</InputLabel>
                <Select>
                  <MenuItem>Turkey</MenuItem>
                  <MenuItem>Syria</MenuItem>
                  <MenuItem>Moroco</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item="true" size={{ xs: 8, md: 5, lg: 3.1 }}>
              {userRole !== "User" && (
                <Button
                  onClick={() =>
                    router.push("/home/company-profile-edit")
                  }
                  fullWidth
                  sx={{
                    mt: "26px",
                    textTransform: "none",
                    fontSize: "20px",
                    color: "#4E73DF",
                    borderColor: "#4E73DF",
                  }}
                  variant="outlined"
                  startIcon={<EditOffOutlinedIcon />}
                >
                  Edit
                </Button>
              )}
            </Grid>
          </Grid>
          <Grid item="true" size={4}>
            <Box
              sx={{
                width: { lg: "365px", xs: "255px", sm: "520px", md: "260px" },
                height: { md: "369px", xs: "255px", sm: "520px", lg: "365px" },
                position: "relative",
                mt: "40px",
              }}
            >
              <Image
                src={"/map.png"}
                alt="logo"
                fill={true}
                object-fit="cover"
                priority={true}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CompanyProfile;
