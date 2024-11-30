import React, { useState, useEffect } from "react";
import Image from "next/image";
import SecondNavBar from "@/components/SecondNavBar";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Card,
  Select,
  MenuItem,
  Box,
  Alert,
  Snackbar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useQuery, useMutation } from "@tanstack/react-query";
import { GetCompanies, EditCompanies } from "@/pages/api/companies";

const CompanyProfileEdit = () => {
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };


  const [formData, setFormData] = useState({
    id:"",
    companyName: "",
    vatNumber: "",
    streetOne: "",
    streetTwo: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const { data: Company } = useQuery({
    queryKey: ["Company"],
    queryFn: GetCompanies,
  });

  useEffect(() => {
    if (Company) {
      setFormData({
        id:Company.id || "",
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
      setSnackbarMessage("Contact updated successful!");
      router.push("/home/home-page");
    },
    onError: (error) => {
      console.error("Error updating contact:", error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    EditCompaniesMutate(formData);
  };


  return (
    <>
      <Container maxWidth="xl">
        <SecondNavBar path="Home / Company Profile" />
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
                <FormControl size="small" fullWidth>
                  <OutlinedInput
                    name="companyName"
                    onChange={handleChange}
                    value={formData.companyName}
                    type="text"
                  />
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  VAT Number
                </Typography>
                <FormControl fullWidth size="small">
                  <OutlinedInput
                    name="vatNumber"
                    onChange={handleChange}
                    value={formData.vatNumber}
                    type="text"
                  />
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  Street
                </Typography>
                <FormControl fullWidth size="small">
                  <OutlinedInput
                    name="streetOne"
                    onChange={handleChange}
                    value={formData.streetOne}
                    type="text"
                  />
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  Street 2
                </Typography>
                <FormControl fullWidth size="small">
                  <OutlinedInput
                    name="streetTwo"
                    onChange={handleChange}
                    value={formData.streetTwo}
                    type="text"
                  />
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  City
                </Typography>
                <FormControl variant="outlined" fullWidth size="small">
                  <OutlinedInput
                    name="city"
                    onChange={handleChange}
                    value={formData.city}
                    type="text"
                  />
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  State
                </Typography>
                <FormControl fullWidth size="small">
                  <OutlinedInput
                    name="state"
                    onChange={handleChange}
                    value={formData.state}
                    type="text"
                  />
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  Zip
                </Typography>
                <FormControl variant="outlined" fullWidth size="small">
                  <OutlinedInput
                    name="zip"
                    onChange={handleChange}
                    value={formData.zip}
                    type="text"
                  />
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  Country
                </Typography>
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ color: "#868E96" }}>
                    Select your country
                  </InputLabel>
                  <Select
                    name="country"
                    onChange={handleChange}
                    value={formData.country}
                    label="Select your country"
                  >
                    <MenuItem value={"Turkey"}>Turkey</MenuItem>
                    <MenuItem value={"Syria"}>Syria</MenuItem>
                    <MenuItem value={"Moroco"}>Moroco</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item="true" size={{ xs: 8, md: 5, lg: 3.1 }}>
                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    mt: "26px",
                    textTransform: "none",
                    fontSize: "20px",
                    borderColor: "#4E73DF",
                  }}
                  variant="contained"
                >
                  Save
                </Button>
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
    </>
  );
};

export default CompanyProfileEdit;
