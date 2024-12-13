import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { GetCompanies } from "@/pages/api/companies";
import { CurrnetUserContext } from "@/Context/Context";
import Image from "next/image";
import Head from "next/head";
import Breadcrumbs from "@/components/layouts/Breadcrumbs";
import EditButton from "@/components/Buttons/EditButton";
import PageTitle from "@/components/serveries/PageTitle";
import CustomTextField from "@/components/serveries/CustomTextField";
import Loader from "@/components/layouts/Loader";
import Label from "@/components/serveries/Label";
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  Box,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

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
        <Breadcrumbs path={router.pathname} />
        <PageTitle path="" title="My Profile" />

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
              <Label label="Company name" />
              <CustomTextField
                fullWidth
                name="companyName"
                defaultValue={data.companyName}
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Label label="VAT Number" />
              <CustomTextField
                fullWidth
                name="vatNumber"
                defaultValue={data.vatNumber}
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Label label="Street" />
              <CustomTextField
                fullWidth
                name="streetOne"
                defaultValue={data.streetOne}
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Label label="Street 2" />
              <CustomTextField
                fullWidth
                name="streetTwo"
                defaultValue={data.streetTwo}
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Label label="City" />
              <CustomTextField
                fullWidth
                name="city"
                defaultValue={data.city}
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Label label="State" />
              <CustomTextField
                fullWidth
                name="state"
                defaultValue={data.state}
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Label label="Zip" />
              <CustomTextField
                fullWidth
                name="zip"
                defaultValue={data.zip}
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Label label="Country" />
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
                <EditButton path="/home/company-profile-edit" />
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
