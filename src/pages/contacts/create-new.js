import { useMutation } from "@tanstack/react-query";
import SecondNavBar from "@/components/SecondNavBar";
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  Container,
  Typography,
  Avatar,
  Button,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  Alert,
  Snackbar,
  FormHelperText,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { AddContact } from "@/pages/api/contact";

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

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.FirstName) newErrors.FirstName = "First name is required.";
    if (!formData.LastName) newErrors.LastName = "Last name is required.";
    if (!formData.Email) newErrors.Email = "Email is required.";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "PhoneNumber is required.";
    if (!formData.Address) newErrors.Address = "Address is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { mutateAsync: ContactAdd } = useMutation({
    mutationFn: (data) => AddContact(data, router),
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
    } else if (error.response && error.response.status === 400) {
      return "One of the entered emails is already associated with a contact.";
    } else {
      return "An unexpected server error occurred. Please try again later.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formToSend = new FormData();
    for (let key in formData) {
      if (formData[key]) {
        formToSend.append(key, formData[key]);
      }
    }

    try {
      await ContactAdd(formToSend);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <SecondNavBar path="Home / Contacts / Create new" />
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
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    hidden
                  />
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
                  <FormControl
                    error={!!errors.FirstName}
                    size="small"
                    variant="outlined"
                    fullWidth
                  >
                    <InputLabel sx={{ color: "#868E96" }}>First</InputLabel>
                    <OutlinedInput
                      name="FirstName"
                      onChange={handleChange}
                      label="First"
                      type="text"
                    />
                    {errors.FirstName && (
                      <FormHelperText>{errors.FirstName}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Last name  <span style={{ color: "#C70000" }}>*</span>
                  </Typography>
                  <FormControl
                    error={!!errors.LastName}
                    size="small"
                    variant="outlined"
                    fullWidth
                  >
                    <InputLabel sx={{ color: "#868E96" }}>Last</InputLabel>
                    <OutlinedInput
                      name="LastName"
                      onChange={handleChange}
                      label="Last"
                      type="text"
                    />
                    {errors.LastName && (
                      <FormHelperText>{errors.LastName}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Email
                  </Typography>
                  <FormControl
                    error={!!errors.Email}
                    size="small"
                    variant="outlined"
                    fullWidth
                  >
                    <InputLabel sx={{ color: "#868E96" }}>
                      name@example.com
                    </InputLabel>
                    <OutlinedInput
                      name="Email"
                      onChange={handleChange}
                      label="name@example.com"
                      type="email"
                    />
                    {errors.Email && (
                      <FormHelperText>{errors.Email}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Phone <span style={{ color: "#C70000" }}>*</span>
                  </Typography>
                  <FormControl
                    error={!!errors.phoneNumber}
                    size="small"
                    variant="outlined"
                    fullWidth
                  >
                    <InputLabel sx={{ color: "#868E96" }}>
                      555-123-4567
                    </InputLabel>
                    <OutlinedInput
                      name="phoneNumber"
                      onChange={handleChange}
                      label="555-123-4567"
                      type="number"
                    ></OutlinedInput>
                    {errors.phoneNumber && (
                      <FormHelperText>{errors.phoneNumber}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Email 2
                  </Typography>
                  <FormControl
                    error={!!errors.EmailTwo}
                    size="small"
                    variant="outlined"
                    fullWidth
                  >
                    <InputLabel sx={{ color: "#868E96" }}>
                      name@example.com
                    </InputLabel>
                    <OutlinedInput
                      name="EmailTwo"
                      onChange={handleChange}
                      label="name@example.com"
                      type="text"
                    ></OutlinedInput>
                    {errors.EmailTwo && (
                      <FormHelperText>{errors.EmailTwo}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Mobile
                  </Typography>
                  <FormControl size="small" variant="outlined" fullWidth>
                    <InputLabel sx={{ color: "#868E96" }}>
                      555-123-4567
                    </InputLabel>
                    <OutlinedInput
                      name="mobileNumber"
                      onChange={handleChange}
                      label="555-123-4567"
                      type="number"
                    ></OutlinedInput>
                  </FormControl>
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Address
                  </Typography>
                  <TextField
                    name="Address"
                    error={!!errors.Address}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Address"
                    multiline
                    rows={3}
                    label="Address"
                  />
                  {errors.Address && (
                    <FormHelperText sx={{ color: "#f44336" }}>
                      {errors.Address}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Address 2
                  </Typography>
                  <TextField
                    onChange={handleChange}
                    name="AddressTwo"
                    label="address 2"
                    fullWidth
                    placeholder="Address 2"
                    multiline
                    rows={3}
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
                    onClick={() => router.push("/home/contacts")}
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
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default CreateNew;
