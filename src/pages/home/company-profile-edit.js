import React, { useState, useEffect } from "react";
import { GetCompanies, EditCompanies } from "@/pages/api/companies";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Breadcrumbs from "@/components/layouts/Breadcrumbs";
import PageTitle from "@/components/serveries/PageTitle";
import SaveButton from "@/components/Buttons/SaveButton";
import FormValidator from "@/components/serveries/FormValidator";
import SnackbarAlert from "@/components/layouts/SnackbarAlert";
import CustomTextField from "@/components/serveries/CustomTextField";
import Loader from "@/components/layouts/Loader";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const CompanyProfileEdit = () => {
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const [formData, setFormData] = useState({
    id: "",
    companyName: "",
    vatNumber: "",
    streetOne: "",
    streetTwo: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const emptyFields = FormValidator({
    formData,
  });

  const { data: Company, isLoading } = useQuery({
    queryKey: ["Company"],
    queryFn: GetCompanies,
  });

  useEffect(() => {
    if (Company) {
      setFormData({
        id: Company.id || "",
        companyName: Company.companyName || "",
        vatNumber: Company.vatNumber || "",
        streetOne: Company.streetOne || "",
        streetTwo: Company.streetTwo || "",
        city: Company.city || "",
        state: Company.state || "",
        zip: Company.zip || "",
        country: Company.country || "",
      });
    }
  }, [Company]);

  const { mutateAsync: EditCompaniesMutate } = useMutation({
    mutationFn: (formData) => EditCompanies(formData),
    onSuccess: () => {
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("company profile updated successful!");
      router.push("/home");
    },
    onError: (error) => {
      console.error("Error company profile contact:", error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emptyFields.length > 0) {
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Please fill all fields.");
      return;
    }
    EditCompaniesMutate(formData);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Head>
        <title>Edit Company</title>
      </Head>
      <Container maxWidth="xl">
        <Breadcrumbs path={router.pathname} />
        <PageTitle path="" title="My Profile" />
        <Box component="form" onSubmit={handleSubmit}>
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
                  value={formData.companyName}
                  type="text"
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  VAT Number
                </Typography>
                <CustomTextField
                  fullWidth
                  name="vatNumber"
                  value={formData.vatNumber}
                  type="text"
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  Street
                </Typography>
                <CustomTextField
                  fullWidth
                  name="streetOne"
                  value={formData.streetOne}
                  type="text"
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  Street 2
                </Typography>
                <CustomTextField
                  fullWidth
                  name="streetTwo"
                  value={formData.streetTwo}
                  type="text"
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  City
                </Typography>
                <CustomTextField
                  fullWidth
                  name="city"
                  value={formData.city}
                  type="text"
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  State
                </Typography>
                <CustomTextField
                  fullWidth
                  name="state"
                  value={formData.state}
                  type="text"
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  Zip
                </Typography>
                <CustomTextField
                  fullWidth
                  name="zip"
                  value={formData.zip}
                  type="text"
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  Country
                </Typography>
                <Select
                  fullWidth
                  size="small"
                  name="country"
                  onChange={handleChange}
                  value={formData.country}
                >
                  <MenuItem value={"Turkey"}>Turkey</MenuItem>
                  <MenuItem value={"Syria"}>Syria</MenuItem>
                  <MenuItem value={"Moroco"}>Moroco</MenuItem>
                </Select>
              </Grid>
              <Grid
                item="true"
                size={{ xs: 8, md: 5, lg: 3.1 }}
                sx={{ mt: "26px" }}
              >
                <SaveButton />
              </Grid>
            </Grid>
            <Grid item="true" size={4}>
              <Box
                sx={{
                  width: { lg: "365px", xs: "255px", sm: "520px", md: "260px" },
                  height: {
                    md: "369px",
                    xs: "255px",
                    sm: "520px",
                    lg: "365px",
                  },
                  position: "relative",
                  mt: "40px",
                }}
              >
                <Image
                  src={"/map.png"}
                  alt="logo"
                  layout="fill"
                  objectFit="cover"
                  priority={true}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <SnackbarAlert
        open={openSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default CompanyProfileEdit;
