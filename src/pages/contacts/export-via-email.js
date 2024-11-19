import UserTable from "@/components/UserTable";
import userData from "@/data/userData.json";
import SecondNavBar from "@/components/SecondNavBar";

import {
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const ExportViaEmail = () => {
  return (
    <>
      <Container maxWidth="xl">
        <SecondNavBar path="Home / Contacts / Export via email" />
        <Grid
          alignItems="center"
          container
          size={12}
          direction="row-reverse"
          mb="18px"
        >
          <Grid
            container
            item="true"
            justifyContent="flex-end"
            alignItems="center"
            size={{ xs: 12, md: 8.5 }}
            gap="25px"
          >
            <Grid item="true" size={{ xs: 6.6, md: 4.7, lg: 3.5 }}>
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                sx={{
                  bgcolor: "white",
                }}
              >
                <InputLabel sx={{ color: "#868E96" }}>
                  name@example.com
                </InputLabel>
                <OutlinedInput
                  label="name@example.com"
                  type="text"
                ></OutlinedInput>
              </FormControl>
            </Grid>
            <Grid item="true" size={{ xs: 5, md: 3, lg: 1.8 }}>
              <Button
                fullWidth
                sx={{
                  bgcolor: "#4E73DF",
                  fontSize: "18px",
                  textTransform: "none",
                  boxShadow: 0,
                }}
                variant="contained"
              >
                Send
              </Button>
            </Grid>
          </Grid>
          <Grid item="true" size={{ xs: 12, md: 3, lg: 3.5 }}>
            <FormControl
              fullWidth
              size="small"
              variant="outlined"
              sx={{
                bgcolor: "white",
                mt: { xs: "11px", md: 0 },
              }}
            >
              <InputLabel sx={{ color: "#868E96" }}>Search</InputLabel>
              <OutlinedInput label="Search" type="text"></OutlinedInput>
            </FormControl>
          </Grid>
        </Grid>
        <UserTable data={userData} favorite={true} />
      </Container>
    </>
  );
};

export default ExportViaEmail;
