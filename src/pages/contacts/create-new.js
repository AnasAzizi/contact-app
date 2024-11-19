import SecondNavBar from "@/components/SecondNavBar";
import React from "react";
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
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const CreateNew = () => {
  const router = useRouter();

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
            Latest activities
          </Typography>
        </Card>
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
              <Avatar sx={{ width: 202, height: 202 }} />
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
                bgcolor="#4E73DF"
                sx={{ textTransform: "none", boxShadow: "none" }}
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
                  First name <span style={{ color: "#C70000" }}>*</span>
                </Typography>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel sx={{ color: "#868E96" }}>First</InputLabel>
                  <OutlinedInput label="First" type="text" />
                </FormControl>
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  First name<span style={{ color: "#C70000" }}>*</span>
                </Typography>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel sx={{ color: "#868E96" }}>Last</InputLabel>
                  <OutlinedInput label="Last" type="text" />
                </FormControl>
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  Email
                </Typography>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel sx={{ color: "#868E96" }}>
                    name@example.com
                  </InputLabel>
                  <OutlinedInput label="name@example.com" type="email" />
                </FormControl>
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  Phone <span style={{ color: "#C70000" }}>*</span>
                </Typography>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel sx={{ color: "#868E96" }}>
                    555-123-4567
                  </InputLabel>
                  <OutlinedInput
                    label="555-123-4567"
                    type="number"
                  ></OutlinedInput>
                </FormControl>
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  Email 2
                </Typography>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel sx={{ color: "#868E96" }}>
                    name@example.com
                  </InputLabel>
                  <OutlinedInput
                    label="name@example.com"
                    type="text"
                  ></OutlinedInput>
                </FormControl>
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  Mobile
                </Typography>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel sx={{ color: "#868E96" }}>
                    555-123-4567
                  </InputLabel>
                  <OutlinedInput
                    label="555-123-4567"
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
                  label="Address"
                />
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  Address 2
                </Typography>
                <TextField
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
              gap={{ md: 10 }}
            >
              <Grid item="true" size={{ xs: 6, md: 2 }}>
                <Button
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
              <Grid item="true" size={{ xs: 6, md: 2 }}>
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
      </Container>
    </>
  );
};

export default CreateNew;
