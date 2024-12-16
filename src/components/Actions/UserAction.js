import React, { useState, useEffect } from "react";
import { useCurrentUser } from "@/Context/Context";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { UserView, UserEdit } from "@/pages/api/user";
import Head from "next/head";
import FormValidator from "@/components/serveries/FormValidator";
import SubmitButton from "@/components/Buttons/SubmitButton";
import Label from "@/components/serveries/Label";
import Breadcrumbs from "@/components/layouts/Breadcrumbs";
import EditButton from "@/components/Buttons/EditButton";
import BackButton from "@/components/Buttons/BackButton";
import CustomTextField from "@/components/serveries/CustomTextField";
import SnackbarAlert from "@/components/layouts/SnackbarAlert";
import Loader from "@/components/layouts/Loader";
import {
  Container,
  Typography,
  FormControl,
  Card,
  Select,
  Switch,
  Box,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const UserAction = ({ mode, id }) => {
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

  const { mutateAsync: UserViewMutate, isPending } = useMutation({
    mutationFn: () => UserView(id),
    onSuccess: (data) => {
      setContact(data);
    },
    onError: (err) => {
      console.error("Error fetching contact:", err);
    },
  });

  useEffect(() => {
    if (id) {
      UserViewMutate();
    }
  }, [id]);

  const emptyFields = contact
    ? FormValidator({
        formData: contact,
        excludedFields: ["role", "status", "phoneNumber"],
      })
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const { mutateAsync: UserEditMutate } = useMutation({
    mutationFn: (updatedUser) => UserEdit(updatedUser, id),
    onSuccess: () => {
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("User updated successful!");
      router.push("/users");
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
    UserEditMutate(contact);
  };

  return !contact || isPending ? (
    <Loader />
  ) : (
    <>
      <Head>
        <title>{mode === "edit" ? "Edit User" : "View User"}</title>
      </Head>
      {contact && (
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
              <Typography fontSize="20px">
                {contact.status === "Active" ? "Unlocked" : "Locked"}
              </Typography>
              <Switch
                disabled={mode !== "edit"}
                name="status"
                checked={contact.status === "Locked"}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "status",
                      value: e.target.checked ? "Locked" : "Active",
                    },
                  })
                }
              />
            </Box>
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
                <Label label="First name" />
                <CustomTextField
                  fullWidth
                  onChange={handleChange}
                  name="firstName"
                  value={contact.firstName}
                  disabled={mode !== "edit"}
                  type="text"
                />
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 6 }}>
                <Label label="Last name" />
                <CustomTextField
                  fullWidth
                  onChange={handleChange}
                  name="lastName"
                  value={contact.lastName}
                  disabled={mode !== "edit"}
                  type="text"
                />
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 4 }}>
                <Label label="Email" />
                <CustomTextField
                  fullWidth
                  onChange={handleChange}
                  name="email"
                  value={contact.email}
                  disabled={mode !== "edit"}
                  type="email"
                />
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 4 }}>
                <Label label="Phone" />
                <CustomTextField
                  fullWidth
                  onChange={handleChange}
                  name="phoneNumber"
                  value={contact.phoneNumber}
                  disabled={mode !== "edit"}
                  type="number"
                />
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 4 }}>
                <Label label="User Type" />
                <FormControl
                  size="small"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  disabled={mode !== "edit"}
                >
                  <Select
                    size="small"
                    fullWidth
                    name="role"
                    onChange={handleChange}
                    value={contact.role}
                  >
                    <MenuItem value={"User"}>user</MenuItem>
                    <MenuItem value={"Admin"}>Admin</MenuItem>
                    <MenuItem value={"Owner"}>Owner</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid container item="true" direction="row" size={12} pt="30px">
                {userRole !== "User" && mode !== "edit" && (
                  <Grid item="true" size={{ xs: 6, md: 2 }}>
                    <EditButton path={`/users/edit/${id}`} />
                  </Grid>
                )}
                {userRole !== "User" && mode === "edit" && (
                  <Grid item="true" size={{ xs: 12, sm: 5.7, md: 2 }}>
                    <SubmitButton text="Save" />
                  </Grid>
                )}
                <Grid item="true" size={{ xs: 6, md: 2 }}>
                  <BackButton path="/users" />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
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

export default UserAction;
