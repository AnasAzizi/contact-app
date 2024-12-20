import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { AddUser } from "@/pages/api/user";
import Head from "next/head";
import Label from "@/components/serveries/Label";
import PageTitle from "@/components/serveries/PageTitle";
import Breadcrumbs from "@/components/layouts/Breadcrumbs";
import SnackbarAlert from "@/components/layouts/SnackbarAlert";
import FormValidator from "@/components/serveries/FormValidator";
import CustomTextField from "@/components/serveries/CustomTextField";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Button,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const InviteNewUser = () => {
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  const emptyFields = FormValidator({
    formData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { mutateAsync: AddUserMutate } = useMutation({
    mutationFn: (data) => AddUser(data, router),
    onSuccess: () => {
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Invited user successful!");
      router.push("/users");
    },
    onError: (error) => {
      console.error("Error Invite user:", error);
      setOpenSnackbar(true);
      setSnackbarSeverity(error.response?.status === 403 ? "error" : "warning");
      setSnackbarMessage(getErrorMessage(error));
    },
  });

  const getErrorMessage = (error) => {
    if (error.response && error.response.status === 403) {
      return "Validation errors occurred. Email is taken.";
    } else if (error.response && error.response.status === 500) {
      return "An unexpected server error occurred. Please try again later.";
    } else {
      return "Registration failed. Please check your input and try again.";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emptyFields.length > 0) {
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Please fill all fields.");
      return;
    }
    AddUserMutate(formData);
  };

  return (
    <>
      <Head>
        <title>Invite New User</title>
      </Head>
      <Container maxWidth="xl">
        <Breadcrumbs path={router.pathname} />
        <PageTitle path="" title="User details" />
        <Box component="form" onSubmit={handleSubmit}>
          <Grid
            container
            pt="44px"
            pb="39px"
            px={{ xs: "32px", md: "60px" }}
            size={12}
            direction={{ xs: "column", md: "row" }}
            bgcolor="white"
            sx={{ boxShadow: 3 }}
            rowSpacing="30px"
            columnSpacing="50px"
          >
            <Grid item="true" size={{ xs: 12, md: 6 }}>
              <Label label="First name" withStar={true} />
              <CustomTextField
                fullWidth
                name="firstName"
                onChange={handleChange}
                placeholder="First Name"
              />
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 6 }}>
              <Label label="Last name" withStar={true} />
              <CustomTextField
                fullWidth
                name="lastName"
                onChange={handleChange}
                placeholder="Last Name"
              />
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 4 }}>
              <Label label="Email" withStar={true} />
              <CustomTextField
                fullWidth
                name="email"
                onChange={handleChange}
                placeholder="mail@gmail.com"
                type="email"
              />
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 4 }}>
              <Label label="Phone" withStar={true} />
              <CustomTextField
                fullWidth
                name="phoneNumber"
                onChange={handleChange}
                placeholder="Phone Number"
                type="number"
              />
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 4 }}>
              <Label label="User Type" withStar={true} />
              <FormControl fullWidth size="small">
                <InputLabel>Select user type</InputLabel>
                <Select
                  fullWidth
                  size="small"
                  label="Select user type"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <MenuItem value={"User"}>User</MenuItem>
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                  <MenuItem value={"Owner"}>Owner</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container item="true" direction="row" size={12} pt="30px">
              <Grid item="true" size={{ xs: 6, md: 2 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontSize: "20px",
                    bgcolor: "#4E73DF",
                  }}
                >
                  Invite
                </Button>
              </Grid>
              <Grid item="true" size={{ xs: 6, md: 2 }}>
                <Button
                  onClick={() => router.push("/users")}
                  fullWidth
                  variant="outlined"
                  bgcolor="#4E73DF"
                  sx={{
                    textTransform: "none",
                    fontSize: "20px",
                    borderColor: "#4E73DF",
                    color: "#4E73DF",
                  }}
                >
                  Cancel
                </Button>
              </Grid>
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

export default InviteNewUser;
