import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ViewContact, EditContact } from "@/pages/api/contact";
import { useRouter } from "next/router";
import Head from "next/head";
import Breadcrumbs from "@/components/layouts/Breadcrumbs";
import SnackbarAlert from "@/components/layouts/SnackbarAlert";
import BackButton from "@/components/Buttons/BackButton";
import SubmitButton from "@/components/Buttons/SubmitButton";
import FormValidator from "@/components/serveries/FormValidator";
import ContactFromGrid from "@/components/ContactFromGrid";
import Loader from "@/components/layouts/Loader";
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
      router.push("/contacts");
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

  const fields = [
    {
      label: "First name",
      name: "firstName",
      type: "text",
      placeholder: "Enter your first name",
    },
    {
      label: "Last name",
      name: "lastName",
      type: "text",
      placeholder: "Enter your last name",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      label: "Phone",
      name: "phoneNumber",
      type: "number",
      placeholder: "Enter your phoneNumber",
    },
    {
      label: "Email 2",
      name: "emailTwo",
      type: "email",
      placeholder: "abc@gmail.com",
    },
    {
      label: "Mobile",
      name: "mobileNumber",
      type: "number",
      placeholder: "123-456-789-01",
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      placeholder: "Address",
      multiline: true,
      rows: 4,
    },
    {
      label: "Address 2",
      name: "addressTwo",
      type: "text",
      placeholder: "address 2",
      multiline: true,
      rows: 4,
    },
  ];

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Head>
        <title>Edit Contact</title>
      </Head>
      <Container maxWidth="xl">
        <Breadcrumbs
          path={router.pathname}
          name={`${formData.firstName} ${formData.lastName}`}
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
                {fields.map((field) => (
                  <ContactFromGrid
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    type={field.type}
                    multiline={field.multiline || false}
                    rows={field.rows || 1}
                  />
                ))}
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
                  <SubmitButton text="Save" />
                </Grid>
                <Grid item="true" size={{ xs: 12, sm: 5.7, md: 2 }}>
                  <BackButton path={`/contacts/view/${id}`} />
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
