import React, { useState, useEffect } from "react";
import { GetCompanies, EditCompanies } from "@/pages/api/companies";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useCurrentUser } from "@/Context/Context";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Breadcrumbs from "@/components/layouts/Breadcrumbs";
import EditButton from "@/components/Buttons/EditButton";
import PageTitle from "@/components/serveries/PageTitle";
import CustomTextField from "@/components/serveries/CustomTextField";
import SubmitButton from "@/components/Buttons/SubmitButton";
import FormValidator from "@/components/serveries/FormValidator";
import SnackbarAlert from "@/components/layouts/SnackbarAlert";
import Loader from "@/components/layouts/Loader";
import Label from "@/components/serveries/Label";
import { Container, FormControl, Select, Box, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid2";

const CompanyProfile = ({ mode }) => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const userRole = currentUser.role;
  const [company, setCompany] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const emptyFields = company
    ? FormValidator({
        formData: company,
      })
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name]: value }));
  };

  const { data: CompanyData, isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: GetCompanies,
  });

  useEffect(() => {
    if (CompanyData) {
      setCompany(CompanyData);
    }
  }, [CompanyData]);

  const { mutateAsync: EditCompaniesMutate } = useMutation({
    mutationFn: (company) => EditCompanies(company),
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emptyFields.length > 0) {
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Please fill all fields.");
      return;
    }
    EditCompaniesMutate(company);
  };

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
                <Label label="Company name" />
                <CustomTextField
                  fullWidth
                  onChange={handleChange}
                  name="companyName"
                  defaultValue={CompanyData.companyName}
                  disabled={mode !== "company-profile-edit"}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Label label="VAT Number" />
                <CustomTextField
                  fullWidth
                  onChange={handleChange}
                  name="vatNumber"
                  defaultValue={CompanyData.vatNumber}
                  disabled={mode !== "company-profile-edit"}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Label label="Street" />
                <CustomTextField
                  fullWidth
                  onChange={handleChange}
                  name="streetOne"
                  defaultValue={CompanyData.streetOne}
                  disabled={mode !== "company-profile-edit"}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Label label="Street 2" />
                <CustomTextField
                  fullWidth
                  onChange={handleChange}
                  name="streetTwo"
                  defaultValue={CompanyData.streetTwo}
                  disabled={mode !== "company-profile-edit"}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Label label="City" />
                <CustomTextField
                  fullWidth
                  onChange={handleChange}
                  name="city"
                  defaultValue={CompanyData.city}
                  disabled={mode !== "company-profile-edit"}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Label label="State" />
                <CustomTextField
                  fullWidth
                  onChange={handleChange}
                  name="state"
                  defaultValue={CompanyData.state}
                  disabled={mode !== "company-profile-edit"}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Label label="Zip" />
                <CustomTextField
                  fullWidth
                  onChange={handleChange}
                  name="zip"
                  defaultValue={CompanyData.zip}
                  disabled={mode !== "company-profile-edit"}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Label label="Country" />
                <FormControl
                  size="small"
                  fullWidth
                  onChange={handleChange}
                  disabled={mode !== "company-profile-edit"}
                >
                  <Select
                    fullWidth
                    size="small"
                    name="country"
                    onChange={handleChange}
                    value={CompanyData.country}
                  >
                    <MenuItem value={"Turkey"}>Turkey</MenuItem>
                    <MenuItem value={"Syria"}>Syria</MenuItem>
                    <MenuItem value={"Moroco"}>Moroco</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid
                item="true"
                size={{ xs: 8, md: 5, lg: 3.1 }}
                sx={{ mt: "26px" }}
              >
                {userRole !== "User" && (
                  <>
                    {mode === "company-profile" && (
                      <EditButton path="/home/company-profile-edit" />
                    )}
                    {mode === "company-profile-edit" && (
                      <SubmitButton text="Save" />
                    )}
                  </>
                )}
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
                  fill={true}
                  object-fit="cover"
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

export default CompanyProfile;
