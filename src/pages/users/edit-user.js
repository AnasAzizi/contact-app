import React from "react";
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
  Switch,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SecondNavBar from "@/components/SecondNavBar";
import viewProfile from "@/data/viewProfile.json";
import { useRouter } from "next/router";

const EditUser = () => {
  const router = useRouter();

  return (
    <>
      <Container maxWidth="xl">
        <SecondNavBar path="Home / Users / Adam  Smith" />
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
            <Typography>Unlocked</Typography>
            <Switch defaultChecked />
          </Box>
        </Card>
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
                sx={{ color: "gray" }}
                value={viewProfile.firstName}
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
                sx={{ color: "gray" }}
                value={viewProfile.firstName}
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
                sx={{ color: "gray" }}
                value={viewProfile.firstName}
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
                sx={{ color: "gray" }}
                value={viewProfile.phone}
                type="number"
              />
            </FormControl>
          </Grid>
          <Grid item="true" size={{ xs: 12, md: 4 }}>
            <Typography mb="12px" color="black" fontSize="20px">
              User Type
            </Typography>
            <FormControl size="small" variant="outlined" fullWidth>
              <InputLabel sx={{ color: "#868E96" }}>
                Select user type
              </InputLabel>
              <Select label=" Select user type">
                <MenuItem value={"Turkey"}>Turkey</MenuItem>
                <MenuItem value={"Syria"}>Syria</MenuItem>
                <MenuItem value={"Moroco"}>Moroco</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container item="true" direction="row" size={12} pt="30px">
            <Grid item="true" size={{ xs: 6, md: 2 }}>
              <Button
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
                onClick={() => router.push("/users/view-user")}
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
      </Container>
    </>
  );
};

export default EditUser;
