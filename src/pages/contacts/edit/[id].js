import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ViewContact, EditContact } from "@/pages/api/contact";
import { useRouter } from "next/router";
import Head from "next/head";
import SecondNavBar from "@/components/SecondNavBar";
import SnackbarAlert from "@/components/SnackbarAlert";
import FormValidator from "@/components/FormValidator";
import CustomTextField from "@/components/CustomTextField";
import Loader from "@/components/Loader";
import {
  Card,
  Container,
  Typography,
  Avatar,
  Button,
  Box,
  Switch,
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
    status: "Active",
  });

  const emptyFields = FormValidator({
    formData,
    excludedFields: ["mobileNumber", "addressTwo", "emailTwo"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { data: contact, isLoading } = useQuery({
    queryKey: ["contact"],
    queryFn: () => ViewContact(id),
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
        status: contact.status || "Active",
      });
    }
  }, [contact]);

  const { mutateAsync: EditContactMutate } = useMutation({
    mutationFn: (updatedContact) => EditContact(updatedContact, id),
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emptyFields.length > 0) {
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setSnackbarMessage(
        `Please fill the following required fields: ${emptyFields.join(", ")}`
      );
      return;
    }
    EditContactMutate(formData);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Head>
        <title>Edit Contact</title>
      </Head>
      <Container maxWidth="xl">
        <SecondNavBar
          path={`Home / Contacts /${formData.firstName} ${formData.lastName}`}
        />
        <Card
          sx={{
            height: "72px",
            bgcolor: "#F7F7F7",
            boxShadow: 2,
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
            <Typography fontSize="20px" sx={{ pr: "18px" }}>
              {formData.status === "Active" ? "Active" : "Inactive"}
            </Typography>
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
                  <CustomTextField
                    fullWidth
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Last name
                  </Typography>
                  <CustomTextField
                    fullWidth
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Email
                  </Typography>
                  <CustomTextField
                    fullWidth
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    type="email"
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Phone
                  </Typography>
                  <CustomTextField
                    fullWidth
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phoneNumber"
                    type="number"
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Email 2
                  </Typography>
                  <CustomTextField
                    fullWidth
                    name="emailTwo"
                    value={formData.emailTwo}
                    onChange={handleChange}
                    placeholder="abc@gmail.com"
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
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="123-456-789-01"
                    type="number"
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Address
                  </Typography>
                  <CustomTextField
                    fullWidth
                    multiline
                    rows={4}
                    name="address"
                    placeholder="Address  "
                    value={formData.address}
                    onChange={handleChange}
                    type="text"
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
                    placeholder="Address 2"
                    name="addressTwo"
                    value={formData.addressTwo}
                    onChange={handleChange}
                    type="text"
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
                <Grid item="true" size={{ xs: 12, sm: 5.7, md: 2 }}>
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
                <Grid item="true" size={{ xs: 12, sm: 5.7, md: 2 }}>
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
      <SnackbarAlert
        open={openSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default Edit;
