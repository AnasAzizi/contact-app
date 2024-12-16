import React, { useState, useEffect } from "react";
import { useCurrentUser } from "@/Context/Context";
import { ViewContact, EditContact } from "@/pages/api/contact";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Head from "next/head";
import ContactFromGrid from "@/components/ContactFromGrid";
import SnackbarAlert from "@/components/layouts/SnackbarAlert";
import SubmitButton from "@/components/Buttons/SubmitButton";
import FormValidator from "@/components/serveries/FormValidator";
import Breadcrumbs from "@/components/layouts/Breadcrumbs";
import EditButton from "@/components/Buttons/EditButton";
import BackButton from "@/components/Buttons/BackButton";
import Loader from "@/components/layouts/Loader";
import {
  Card,
  Container,
  Typography,
  Avatar,
  Box,
  Switch,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const ContactAction = ({ mode, id }) => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const userRole = currentUser.role;
  const [contact, setContact] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const emptyFields = contact
    ? FormValidator({
        formData: contact,
        excludedFields: [
          "mobileNumber",
          "addressTwo",
          "emailTwo",
          "image",
          "imageUrl",
        ],
      })
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const { mutateAsync: ViewContactMutate, isPending } = useMutation({
    mutationFn: () => ViewContact(id),
    onSuccess: (data) => {
      setContact(data);
    },
    onError: (err) => {
      console.error("Error fetching contact:", err);
    },
  });

  useEffect(() => {
    if (id) {
      ViewContactMutate();
    }
  }, [id]);

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
    EditContactMutate(contact);
  };

  const fields = contact
    ? [
        { label: "First name", name: "firstName", value: contact.firstName },
        { label: "Last name", name: "lastName", value: contact.lastName },
        { label: "Email", name: "email", value: contact.email },
        {
          label: "Phone",
          name: "phoneNumber",
          value: contact.phoneNumber,
        },
        {
          label: "Email 2",
          name: "emailTwo",
          value: contact.emailTwo,
        },
        {
          label: "Mobile",
          name: "mobileNumber",
          value: contact.mobileNumber,
        },
        {
          label: "Address",
          name: "address",
          value: contact.address,
          multiline: true,
          rows: 4,
        },
        {
          label: "Address 2",
          name: "addressTwo",
          value: contact.addressTwo,
          multiline: true,
          rows: 4,
        },
      ]
    : [];

  return !contact || isPending ? (
    <Loader />
  ) : (
    <>
      <Head>
        <title>{mode === "edit" ? "Edit Contact" : "View Contact"}</title>
      </Head>
      <Container maxWidth="xl">
        <Breadcrumbs
          path={router.pathname}
          name={`${contact.firstName} ${contact.lastName}`}
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
            Contact Details
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
              {contact.status === "Active" ? "Active" : "Inactive"}
            </Typography>
            <Switch
              disabled={mode !== "edit"}
              name="status"
              checked={contact.status === "Active"}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "status",
                    value: e.target.checked ? "Active" : "Inactive",
                  },
                })
              }
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
            >
              <Grid item="true" xs={12}>
                <Avatar sx={{ width: 202, height: 202 }} />
              </Grid>
              <Grid item="true" xs={12}>
                <Typography color="black" fontSize="24px" sx={{ my: "20px" }}>
                  {contact.firstName} {contact.lastName}
                </Typography>
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
                    value={field.value}
                    disabled={mode !== "edit"}
                    multiline={field.multiline || false}
                    rows={field.rows || 1}
                    onChange={handleChange}
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
                {userRole !== "User" && mode !== "edit" && (
                  <Grid item="true" size={{ xs: 12, sm: 5.7, md: 2 }}>
                    <EditButton path={`/contacts/edit/${id}`} />
                  </Grid>
                )}
                {userRole !== "User" && mode === "edit" && (
                  <Grid item="true" size={{ xs: 12, sm: 5.7, md: 2 }}>
                    <SubmitButton text="Save" />
                  </Grid>
                )}
                <Grid item="true" size={{ xs: 12, sm: 5.7, md: 2 }}>
                  <BackButton path={`/contacts`} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <SnackbarAlert
        open={openSnackbar}
        severity={snackbarSeverity}
        onChange={handleChange}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default ContactAction;
