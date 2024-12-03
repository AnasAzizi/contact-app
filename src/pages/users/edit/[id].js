import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { UserView, UserEdit } from "@/pages/api/user";
import SecondNavBar from "@/components/SecondNavBar";
import SnackbarAlert from "@/components/SnackbarAlert";
import {
  Container,
  Typography,
  FormControl,
  OutlinedInput,
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

  const { data: user } = useQuery({
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
    UserEditMutate(formData);
  };

  return (
    <>
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
              <FormControl size="small" variant="outlined" fullWidth>
                <OutlinedInput
                  name="firstName"
                  // sx={{ color: "gray" }}
                  value={formData.firstName}
                  onChange={handleChange}
                  type="text"
                />
              </FormControl>
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Last name
              </Typography>
              <FormControl size="small" variant="outlined" fullWidth>
                <OutlinedInput
                  // sx={{ color: "gray" }}
                  name="lastName"
                  onChange={handleChange}
                  value={formData.lastName}
                  type="text"
                />
              </FormControl>
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 4 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Email
              </Typography>
              <FormControl size="small" variant="outlined" fullWidth>
                <OutlinedInput
                  name="email"
                  // sx={{ color: "gray" }}
                  onChange={handleChange}
                  value={formData.email}
                  type="email"
                />
              </FormControl>
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 4 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Phone
              </Typography>
              <FormControl size="small" variant="outlined" fullWidth>
                <OutlinedInput
                  // sx={{ color: "gray" }}
                  name="phoneNumber"
                  onChange={handleChange}
                  value={formData.phoneNumber}
                  type="number"
                />
              </FormControl>
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 4 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                User Type
              </Typography>
              <FormControl size="small" variant="outlined" fullWidth>
                <Select
                  name="role"
                  onChange={handleChange}
                  value={formData.role}
                >
                  <MenuItem value={"User"}>user</MenuItem>
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
