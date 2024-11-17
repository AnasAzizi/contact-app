import NavBar from "@/components/NavBar";
import React from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Card,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SecondNavBar from "@/components/SecondNavBar";

const InviteNewUser = () => {
  return (
    <>
      <NavBar />
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
        <Grid
          container
          pt="44px"
          pb="39px"
          px="60px"
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
            <FormControl variant="outlined" fullWidth>
              <InputLabel sx={{ color: "#868E96" }}>First Name</InputLabel>
              <OutlinedInput label="First Name" type="text" />
            </FormControl>
          </Grid>
          <Grid item="true" size={{ xs: 12, md: 6 }}>
            <Typography mb="12px" color="black" fontSize="20px">
              Last name <span style={{ color: "#C70000" }}>*</span>
            </Typography>
            <FormControl variant="outlined" fullWidth>
              <InputLabel sx={{ color: "#868E96" }}>Last Name</InputLabel>
              <OutlinedInput label="Last Name" type="text" />
            </FormControl>
          </Grid>
          <Grid item="true" size={{ xs: 12, md: 4 }}>
            <Typography mb="12px" color="black" fontSize="20px">
              Email <span style={{ color: "#C70000" }}>*</span>
            </Typography>
            <FormControl variant="outlined" fullWidth>
              <InputLabel sx={{ color: "#868E96" }}>mail@gmail.com</InputLabel>
              <OutlinedInput label="mail@gmail.com" type="email" />
            </FormControl>
          </Grid>
          <Grid item="true" size={{ xs: 12, md: 4 }}>
            <Typography mb="12px" color="black" fontSize="20px">
              Phone <span style={{ color: "#C70000" }}>*</span>
            </Typography>
            <FormControl variant="outlined" fullWidth>
              <InputLabel sx={{ color: "#868E96" }}>Phone Number</InputLabel>
              <OutlinedInput label="Phone Number" type="number" />
            </FormControl>
          </Grid>
          <Grid item="true" size={{ xs: 12, md: 4 }}>
            <Typography mb="12px" color="black" fontSize="20px">
              User Type <span style={{ color: "#C70000" }}>*</span>
            </Typography>
            <FormControl variant="outlined" fullWidth>
              <InputLabel sx={{ color: "#868E96" }}>
                Select User Type
              </InputLabel>
              <OutlinedInput label="Select user type" type="select" />
            </FormControl>
          </Grid>
          <Grid container item="true" direction="row" size={12} pt="30px">
            <Grid item="true" size={{ xs: 6, md: 2 }}>
              <Button
                fullWidth
                bgcolor="#4E73DF"
                variant="contained"
                sx={{ textTransform: "none", fontSize: "20px" }}
              >
                Invite
              </Button>
            </Grid>
            <Grid item="true" size={{ xs: 6, md: 2 }}>
              <Button
                fullWidth
                bgcolor="#4E73DF"
                variant="outlined"
                sx={{ textTransform: "none", fontSize: "20px" }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default InviteNewUser;
