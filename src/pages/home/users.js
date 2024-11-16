import NavBar from "@/components/NavBar";
import UserTable from "@/components/UserTable";
import userData from "@/data/userData.json";
import {
  Container,
  Divider,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const users = () => {
  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <Typography mt={6} mb={1} variant="h5" color="black">
          Home / Users
        </Typography>
        <Divider sx={{ mb: "31px" }} />
        <Grid container size={12} direction="row" mb={{xs:0,md:"18px"}}>
          <Grid item="true" size={{ xs: 12, md: 3.5 }}>
            <FormControl
              fullWidth
              variant="outlined"
              sx={{
                bgcolor: "white",
              }}
            >
              <InputLabel
                sx={{
                  color: "#868E96",
                }}
              >
                Search
              </InputLabel>
              <OutlinedInput label="Search" type="text"></OutlinedInput>
            </FormControl>
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            alignItems="center"
            item="true"
            size={{ xs: 12, md: 8.5 }}
            direction="row"
            columnSpacing="22px"
          >
            <Grid item="true" size={{ xs: 6, md: 1.2 }} p={{ xs: 1, md: 0 }}>
              <Button
                fullWidth
                color="error"
                variant="contained"
                sx={{
                  fontSize: "18px",
                  textTransform: "none",
                }}
              >
                Delete
              </Button>
            </Grid>
            <Grid item="true" size={{ xs: 6, md: 2.6 }} p={{ xs: 1, md: 0 }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "#4E73DF",
                  fontSize: "18px",
                  textTransform: "none",
                }}
              >
                Invite New User
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <UserTable data={userData} favorite={false} />
      </Container>
    </>
  );
};

export default users;
