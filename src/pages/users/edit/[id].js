import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { UserView, UserEdit } from "@/pages/api/user";
import { useRouter } from "next/router";
import Head from "next/head";
import SecondNavBar from "@/components/SecondNavBar";
import SnackbarAlert from "@/components/SnackbarAlert";
import FormValidator from "@/components/FormValidator";
import CustomTextField from "@/components/CustomTextField";
import Loader from "@/components/Loader";
import {
  Container,
  Typography,
  Button,
  Card,
  Select,
  MenuItem,
  Switch,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const EditUser = () => {
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
    phoneNumber: "",
    status: "",
    role: "",
  });

  const emptyFields = FormValidator({
    formData,
    excludedFields: ["role", "status", "phoneNumber"],
  });

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => UserView(id),
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        status: user.status || "Active",
        role: user.role || "",
      });
    }
  }, [user]);

  const { mutateAsync: UserEditMutate } = useMutation({
    mutationFn: (updatedUser) => UserEdit(updatedUser, id),
    onSuccess: () => {
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("User updated successful!");
      router.push("/home/users");
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

    if (emptyFields.length > 0) {
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setSnackbarMessage(
        `Please fill the following required fields: ${emptyFields.join(", ")}`
      );
      return;
    }
    UserEditMutate(formData);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Head>
        <title>Edit User</title>
      </Head>
      <Container maxWidth="xl">
        <SecondNavBar
          path={`Home / Users /${formData.firstName} ${formData.lastName}`}
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
              {formData.status === "Active" ? "Unlocked" : "Locked"}
            </Typography>
            <Switch
              name="status"
              checked={formData.status === "Locked"}
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
              <Typography mb="12px" color="black" fontSize="20px">
                First name
              </Typography>
              <CustomTextField
                fullWidth
                name="firstName"
                value={formData.firstName}
                type="text"
                onChange={handleChange}
              />
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Last name
              </Typography>
              <CustomTextField
                fullWidth
                name="lastName"
                value={formData.lastName}
                type="text"
                onChange={handleChange}
              />
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 4 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Email
              </Typography>
              <CustomTextField
                fullWidth
                name="email"
                value={formData.email}
                type="text"
                onChange={handleChange}
              />
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 4 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Phone
              </Typography>
              <CustomTextField
                fullWidth
                name="phoneNumber"
                value={formData.phoneNumber}
                type="number"
                onChange={handleChange}
              />
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 4 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                User Type
              </Typography>
              <Select
                size="small"
                fullWidth
                name="role"
                onChange={handleChange}
                value={formData.role}
              >
                <MenuItem value={"User"}>user</MenuItem>
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"Owner"}>Owner</MenuItem>
              </Select>
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
                  Save
                </Button>
              </Grid>
              <Grid item="true" size={{ xs: 6, md: 2 }}>
                <Button
                  onClick={() => router.push(`/users/view/${id}`)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    fontSize: "20px",
                    color: "#4E73DF",
                    borderColor: "#4E73DF",
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

export default EditUser;
