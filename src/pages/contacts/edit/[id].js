import React, { useState, useEffect } from "react";
import SecondNavBar from "@/components/SecondNavBar";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { viewContact, editContact } from "@/pages/api/contact";
import {
  Card,
  Container,
  Typography,
  Avatar,
  Button,
  TextField,
  FormControl,
  OutlinedInput,
  Box,
  Switch,
  Alert,
  Snackbar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
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
    emailTwo: "",
    phoneNumber: "",
    mobileNumber: "",
    address: "",
    addressTwo: "",
    imageUrl: "",
    status: "Active",
  });

  const { data: contact } = useQuery({
    queryKey: ["contact", id],
    queryFn: () => viewContact(id),
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.firstName || "",
        lastName: contact.lastName || "",
        email: contact.email || "",
        emailTwo: contact.emailTwo || "",
        phoneNumber: contact.phoneNumber || "",
        mobileNumber: contact.mobileNumber || "",
        address: contact.address || "",
        addressTwo: contact.addressTwo || "",
        imageUrl: contact.imageUrl || "",
        status: contact.status || "Active",
      });
    }
  }, [contact]);

  const { mutateAsync: contactEdit } = useMutation({
    mutationFn: (updatedContact) => editContact(updatedContact, id),
    onSuccess: () => {
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Contact updated successful!");
      router.push("/home/contacts");
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
    contactEdit(formData);
  };

  console.log("formData", formData);

  return (
    <>
      <Container maxWidth="xl">
        <SecondNavBar
          path={`Home / Contacts /${formData.firstName} ${formData.lastName}`}
        />
        <Card
          sx={{
            height: "72px",
            bgcolor: "#F7F7F7",
            boxShadow: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "23px",
              ml: "40px",
            }}
          >
            User details
          </Typography>
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mr: "40px",
            }}
          >
            <Typography>Active</Typography>
            <Switch
              checked={formData.status === "Active"}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "status",
                    value: e.target.checked ? "Active" : "Inactive",
                  },
                })
              }
              name="status"
            />
          </Box>
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
              mb={5}
            >
              <Grid item="true" xs={12}>
                <Avatar
                  src={formData.imageUrl}
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
                  size="large"
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    boxShadow: "none",
                    bgcolor: "#4E73DF",
                  }}
                >
                  Upload new image
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
                    First name
                  </Typography>
                  <FormControl size="small" variant="outlined" fullWidth>
                    <OutlinedInput
                      name="firstName"
                      onChange={handleChange}
                      value={formData.firstName}
                      type="text"
                    />
                  </FormControl>
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Last name
                  </Typography>
                  <FormControl size="small" variant="outlined" fullWidth>
                    <OutlinedInput
                      name="lastName"
                      onChange={handleChange}
                      value={formData.lastName}
                      type="text"
                    />
                  </FormControl>
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Email
                  </Typography>
                  <FormControl size="small" variant="outlined" fullWidth>
                    <OutlinedInput
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                      type="email"
                    />
                  </FormControl>
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Phone
                  </Typography>
                  <FormControl size="small" variant="outlined" fullWidth>
                    <OutlinedInput
                      name="phoneNumber"
                      onChange={handleChange}
                      value={formData.phoneNumber}
                      type="number"
                    ></OutlinedInput>
                  </FormControl>
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Email 2
                  </Typography>
                  <FormControl size="small" variant="outlined" fullWidth>
                    <OutlinedInput
                      name="emailTwo"
                      onChange={handleChange}
                      value={formData.emailTwo}
                      type="text"
                    ></OutlinedInput>
                  </FormControl>
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Mobile
                  </Typography>
                  <FormControl size="small" variant="outlined" fullWidth>
                    <OutlinedInput
                      name="mobileNumber"
                      onChange={handleChange}
                      value={formData.mobileNumber}
                      type="text"
                    ></OutlinedInput>
                  </FormControl>
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Address
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Address"
                    multiline
                    rows={3}
                    name="address"
                    onChange={handleChange}
                    value={formData.address}
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Address 2
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Address 2"
                    multiline
                    rows={3}
                    name="addressTwo"
                    onChange={handleChange}
                    value={formData.addressTwo}
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
                    sx={{
                      textTransform: "none",
                      fontSize: "20px",
                      boxShadow: "none",
                      bgcolor: "#4E73DF",
                    }}
                    variant="contained"
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item="true" size={{ xs: 12, sm: 5, md: 2 }}>
                  <Button
                    onClick={() => router.push(`/contacts/view/${id}`)}
                    fullWidth
                    variant="outlined"
                    bgcolor="#4E73DF"
                    sx={{
                      textTransform: "none",
                      fontSize: "20px",
                      color: "#4E73DF",
                    }}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Edit;
