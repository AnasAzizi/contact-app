import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { AddContact } from "@/pages/api/contact";
import Head from "next/head";
import SecondNavBar from "@/components/SecondNavBar";
import SnackbarAlert from "@/components/SnackbarAlert";
import CustomTextField from "@/components/CustomTextField";
import FormValidator from "@/components/FormValidator";
import {
  Card,
  Container,
  Typography,
  Avatar,
  Button,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const CreateNew = () => {
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    EmailTwo: "",
    phoneNumber: "",
    mobileNumber: "",
    Address: "",
    AddressTwo: "",
  });

  const emptyFields = FormValidator({
    formData,
    excludedFields: ["mobileNumber","AddressTwo","EmailTwo"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { mutateAsync: ContactAddMutate } = useMutation({
    mutationFn: (data) => AddContact(data),
    onSuccess: () => {
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("User added successful!");
      router.push("/contacts");
    },
    onError: (error) => {
      console.error("Error registering:", error);
      setOpenSnackbar(true);
      setSnackbarSeverity(error.response?.status === 403 ? "error" : "warning");
      setSnackbarMessage(getErrorMessage(error));
    },
  });

  const getErrorMessage = (error) => {
    if (error.response && error.response.status === 403) {
      return "Validation errors occurred. Email is taken.";
    } else if (error.response && error.response.status === 400) {
      return "One of the entered emails is already associated with a contact.";
    } else {
      return "An unexpected server error occurred. Please try again later.";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emptyFields.length > 0) {
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Please fill the following required fields.");
      return;
    }
    ContactAddMutate(formData);
  };

  return (
    <>
      <Head>
        <title>Create New</title>
      </Head>
      <Container maxWidth="xl">
        <SecondNavBar  path={router.pathname} />
        <Card
          sx={{
            height: "72px",
            bgcolor: "#F7F7F7",
            mt: "31px",
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
            Contact details
          </Typography>
        </Card>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid
            container
            pt="45px"
            size={12}
            direction={{ xs: "column", md: "row" }}
            bgcolor="white"
            sx={{ boxShadow: 3 }}
          >
            <Grid
              container
              item="true"
              size={{ xs: 12, md: 12, lg: 3 }}
              direction="column"
              alignItems="center"
              mb="70px"
            >
              <Grid item="true" xs={12}>
                <Avatar
                  src="/Placeholder.jpg"
                  sx={{ width: 202, height: 202 }}
                />
              </Grid>
              <Grid item="true" xs={12}>
                <Typography
                  color="black"
                  fontSize="18px"
                  sx={{ opacity: "40%", my: "20px" }}
                >
                  JPG or PNG no larger than 5 MB
                </Typography>
              </Grid>
              <Grid item="true" xs={12}>
                <Button
                  component="label"
                  size="large"
                  variant="contained"
                  bgcolor="#4E73DF"
                  sx={{ textTransform: "none", boxShadow: "none" }}
                >
                  Upload new image
                  <input type="file" accept="image/png, image/jpeg" hidden />
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              item="true"
              size={{ xs: 12, md: 12, lg: 9 }}
              pr="32px"
              pl={{ xs: "32px", md: 0 }}
            >
              <Grid
                item="true"
                container
                justifyContent="center"
                size={12}
                direction={{ xs: "column", md: "row" }}
                columnSpacing="26px"
                rowSpacing="26px"
                wrap="wrap"
              >
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    First name <span style={{ color: "#C70000" }}>*</span>
                  </Typography>
                  <CustomTextField
                    fullWidth
                    name="FirstName"
                    onChange={handleChange}
                    placeholder="First"
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Last name <span style={{ color: "#C70000" }}>*</span>
                  </Typography>
                  <CustomTextField
                    fullWidth
                    name="LastName"
                    onChange={handleChange}
                    placeholder="Last"
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Email <span style={{ color: "#C70000" }}>*</span>
                  </Typography>
                  <CustomTextField
                    fullWidth
                    name="Email"
                    onChange={handleChange}
                    placeholder="name@example.com"
                    type="email"
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Phone <span style={{ color: "#C70000" }}>*</span>
                  </Typography>
                  <CustomTextField
                    fullWidth
                    name="phoneNumber"
                    onChange={handleChange}
                    placeholder="555-123-4567"
                    type="number"
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Email 2
                  </Typography>
                  <CustomTextField
                    fullWidth
                    name="EmailTwo"
                    onChange={handleChange}
                    placeholder="name@example.com"
                    type="email"
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Mobile
                  </Typography>
                  <CustomTextField
                    fullWidth
                    name="mobileNumber"
                    onChange={handleChange}
                    placeholder="555-123-4567"
                    type="number"
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Address <span style={{ color: "#C70000" }}>*</span>
                  </Typography>
                  <CustomTextField
                    fullWidth
                    multiline
                    rows={4}
                    name="Address"
                    onChange={handleChange}
                    type="text"
                    placeholder="Address"
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Address 2
                  </Typography>
                  <CustomTextField
                    fullWidth
                    multiline
                    rows={4}
                    name="AddressTwo"
                    onChange={handleChange}
                    type="text"
                    placeholder="Address 2"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                size={12}
                mb="47px"
                mt="33px"
                ml={{ md: "27px" }}
                gap={{ xs: 3, md: 10 }}
              >
                <Grid item="true" size={{ xs: 12, sm: 5, md: 2 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    bgcolor="#4E73DF"
                    sx={{
                      textTransform: "none",
                      fontSize: "20px",
                      boxShadow: "none",
                    }}
                  >
                    Create
                  </Button>
                </Grid>
                <Grid item="true" size={{ xs: 12, sm: 5, md: 2 }}>
                  <Button
                    onClick={() => router.push("/contacts")}
                    fullWidth
                    variant="outlined"
                    bgcolor="#4E73DF"
                    sx={{ textTransform: "none", fontSize: "20px" }}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <SnackbarAlert
          open={openSnackbar}
          severity={snackbarSeverity}
          message={snackbarMessage}
          onClose={handleSnackbarClose}
        />
      </Container>
    </>
  );
};

export default CreateNew;
