import SecondNavBar from "@/components/SecondNavBar";
import viewProfile from "@/data/viewProfile.json";
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
  OutlinedInput,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const EditContact = () => {
  const router = useRouter();
  return (
    <>
      <Container maxWidth="xl">
        <SecondNavBar
          path={`Home / Contacts /${viewProfile.firstName} ${viewProfile.lastName}`}
        />
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
            Contact details
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
            size={{ xs: 12, md: 3 }}
            direction="column"
            alignItems="center"
          >
            <Grid item="true" xs={12}>
              <Avatar
                src={viewProfile.imageUrl}
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
                bgcolor="#4E73DF"
                sx={{ textTransform: "none" }}
              >
                Upload new image
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            item="true"
            size={{ xs: 12, md: 9 }}
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
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput value={viewProfile.firstName} type="text" />
                </FormControl>
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  Last name
                </Typography>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput value={viewProfile.lastName} type="text" />
                </FormControl>
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  Email
                </Typography>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput value={viewProfile.email} type="email" />
                </FormControl>
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  Phone
                </Typography>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    value={viewProfile.phone}
                    type="number"
                  ></OutlinedInput>
                </FormControl>
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  Email 2
                </Typography>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    value={viewProfile.email2}
                    type="text"
                  ></OutlinedInput>
                </FormControl>
              </Grid>
              <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                <Typography mb="12px" color="black" fontSize="20px">
                  Mobile
                </Typography>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    value={viewProfile.mobile}
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
                  value={viewProfile.address}
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
                  value={viewProfile.address}
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
                  sx={{
                    textTransform: "none",
                    fontSize: "20px",
                  }}
                  variant="contained"
                >
                  Save
                </Button>
              </Grid>
              <Grid item="true" size={{ xs: 6, md: 2 }}>
                <Button
                  onClick={() => router.push("/contacts/view")}
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

export default EditContact;