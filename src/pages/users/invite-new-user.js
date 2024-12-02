import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { AddUser } from "@/pages/api/user";
import SecondNavBar from "@/components/SecondNavBar";
import SnackbarAlert from "@/components/SnackbarAlert";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Card,
  Select,
  MenuItem,
  Box,
  FormHelperText,
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

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "PhoneNumber is required.";
    if (!formData.role) newErrors.role = "role is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { mutateAsync: AddUserMutate } = useMutation({
    mutationFn: (data) => AddUser(data, router),
    onSuccess: () => {
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Registration successful!");
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
    } else if (error.response && error.response.status === 500) {
      return "An unexpected server error occurred. Please try again later.";
    } else {
      return "Registration failed. Please check your input and try again.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await AddUserMutate(formData);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <SecondNavBar path="Home / Users / Invite new user" />
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
            User details
          </Typography>
        </Card>
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
              <Typography mb="12px" color="black" fontSize="20px">
                First name <span style={{ color: "#C70000" }}>*</span>
              </Typography>
              <FormControl error={!!errors.firstName} fullWidth size="small">
                <InputLabel sx={{ color: "#868E96" }}>First Name</InputLabel>
                <OutlinedInput
                  name="firstName"
                  onChange={handleChange}
                  label="First Name"
                  type="text"
                />
                {errors.firstName && (
                  <FormHelperText>{errors.firstName}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Last name <span style={{ color: "#C70000" }}>*</span>
              </Typography>
              <FormControl error={!!errors.lastName} fullWidth size="small">
                <InputLabel sx={{ color: "#868E96" }}>Last Name</InputLabel>
                <OutlinedInput
                  name="lastName"
                  onChange={handleChange}
                  label="Last Name"
                  type="text"
                />
                {errors.lastName && (
                  <FormHelperText>{errors.lastName}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 4 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Email <span style={{ color: "#C70000" }}>*</span>
              </Typography>
              <FormControl error={!!errors.email} fullWidth size="small">
                <InputLabel sx={{ color: "#868E96" }}>
                  mail@gmail.com
                </InputLabel>
                <OutlinedInput
                  name="email"
                  onChange={handleChange}
                  label="mail@gmail.com"
                  type="email"
                />
                {errors.email && (
                  <FormHelperText>{errors.email}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 4 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Phone <span style={{ color: "#C70000" }}>*</span>
              </Typography>
              <FormControl error={!!errors.phoneNumber} fullWidth size="small">
                <InputLabel sx={{ color: "#868E96" }}>Phone Number</InputLabel>
                <OutlinedInput
                  name="phoneNumber"
                  onChange={handleChange}
                  label="Phone Number"
                  type="number"
                />
                {errors.phoneNumber && (
                  <FormHelperText>{errors.phoneNumber}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 4 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                User Type <span style={{ color: "#C70000" }}>*</span>
              </Typography>
              <FormControl fullWidth size="small" error={!!errors.role}>
                <InputLabel>Select user type</InputLabel>
                <Select
                  label="Select user type"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <MenuItem value={"User"}>User</MenuItem>
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                  <MenuItem value={"Owner"}>Owner</MenuItem>
                </Select>
                {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
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
                  onClick={() => router.push("/home/users")}
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
