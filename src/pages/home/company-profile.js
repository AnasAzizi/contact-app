import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import SecondNavBar from "@/components/SecondNavBar";
import {
  Container,
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Card,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import EditOffOutlinedIcon from "@mui/icons-material/EditOffOutlined";

const CompanyProfile = () => {
  const router = useRouter();

  return (
    <>
      <Container maxWidth="xl">
        <SecondNavBar path="Home / Company Profile" />
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
            My Profile
          </Typography>
        </Card>

        <Grid
          container
          mb="1px"
          pt="42px"
          pb="50px"
          px={{ xs: "20px", md: "75px" }}
          size={12}
          direction={{ xs: "column", md: "row" }}
          bgcolor="white"
          sx={{ boxShadow: 3 }}
          columnSpacing="50px"
        >
          <Grid
            item="true"
            size={{ xs: 12, md: 8 }}
            container
            direction={{ xs: "column", md: "row" }}
            columnSpacing="62px"
            rowSpacing="24px"
            wrap="wrap"
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Company name
              </Typography>
              <FormControl variant="outlined" fullWidth size="small">
                <InputLabel sx={{ color: "#868E96" }}>Company</InputLabel>
                <OutlinedInput label="Company" type="text" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                VAT Number
              </Typography>
              <FormControl variant="outlined" fullWidth size="small">
                <InputLabel sx={{ color: "#868E96" }}>00000</InputLabel>
                <OutlinedInput label="00000" type="number" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Street
              </Typography>
              <FormControl variant="outlined" fullWidth size="small">
                <InputLabel sx={{ color: "#868E96" }}>Street</InputLabel>
                <OutlinedInput label="Street" type="text" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Street 2
              </Typography>
              <FormControl variant="outlined" fullWidth size="small">
                <InputLabel sx={{ color: "#868E96" }}>Street 2</InputLabel>
                <OutlinedInput label="Street 2" type="text" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                City
              </Typography>
              <FormControl variant="outlined" fullWidth size="small">
                <InputLabel sx={{ color: "#868E96" }}>City name</InputLabel>
                <OutlinedInput label="City name" type="text" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                State
              </Typography>
              <FormControl variant="outlined" fullWidth size="small">
                <InputLabel sx={{ color: "#868E96" }}>State</InputLabel>
                <OutlinedInput label="State" type="text" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Zip
              </Typography>
              <FormControl variant="outlined" fullWidth size="small">
                <InputLabel sx={{ color: "#868E96" }}>00000</InputLabel>
                <OutlinedInput label="00000" type="number" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Country
              </Typography>
              <FormControl variant="outlined" fullWidth size="small">
                <InputLabel sx={{ color: "#868E96" }}>
                  Select your country
                </InputLabel>
                <Select label="Select your country">
                  <MenuItem value={"Turkey"}>Turkey</MenuItem>
                  <MenuItem value={"Syria"}>Syria</MenuItem>
                  <MenuItem value={"Moroco"}>Moroco</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item="true" size={{ xs: 8, md: 5, lg: 3.1 }}>
              <Button
                onClick={() =>
                  router.push("/company-profile/company-profile-edit")
                }
                fullWidth
                sx={{
                  mt: "26px",
                  textTransform: "none",
                  fontSize: "20px",
                  color: "#4E73DF",
                  borderColor: "#4E73DF",
                }}
                variant="outlined"
                startIcon={<EditOffOutlinedIcon />}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
          <Grid item="true" size={4}>
            <Box
              sx={{
                width: { lg: "365px", xs: "255px", sm: "520px", md: "260px" },
                height: { md: "369px", xs: "255px", sm: "520px", lg: "365px" },
                position: "relative",
                mt: "40px",
              }}
            >
              <Image
                src={"/map.png"}
                alt="logo"
                layout="fill"
                objectFit="cover"
                priority={true}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CompanyProfile;
