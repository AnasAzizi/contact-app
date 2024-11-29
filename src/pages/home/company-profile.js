import React from "react";
import { useQuery } from "@tanstack/react-query";
import { GetCompanies } from "@/pages/api/companies";
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

  const { data, error } = useQuery({
    queryKey: ["companies"],
    queryFn: GetCompanies,
  });

  if (!data) {
    return <div>No data available.</div>;
  }

  console.log("data",data)
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
              <FormControl size="small" variant="outlined" fullWidth disabled>
                <OutlinedInput value={data.companyName} type="text" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                VAT Number
              </Typography>
              <FormControl size="small" variant="outlined" fullWidth disabled>
                <OutlinedInput value={data.vatNumber} type="text" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Street
              </Typography>
              <FormControl size="small" variant="outlined" fullWidth disabled>
                <OutlinedInput value={data.streetOne} type="text" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Street 2
              </Typography>
              <FormControl size="small" variant="outlined" fullWidth disabled>
                <OutlinedInput value={data.streetTwo} type="text" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                City
              </Typography>
              <FormControl size="small" variant="outlined" fullWidth disabled>
                <OutlinedInput value={data.city} type="text" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                State
              </Typography>
              <FormControl size="small" variant="outlined" fullWidth disabled>
                <OutlinedInput value={data.state} type="text" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Zip
              </Typography>
              <FormControl size="small" variant="outlined" fullWidth disabled>
                <OutlinedInput value={data.zip} type="text" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Country
              </Typography>
              <FormControl size="small" variant="outlined" fullWidth disabled>
                <InputLabel>{data.country}</InputLabel>
                <Select></Select>
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
