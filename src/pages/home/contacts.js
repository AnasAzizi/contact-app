import UserTable from "@/components/UserTable";
import SecondNavBar from "@/components/SecondNavBar";
import userData from "@/data/userData.json";
import { useRouter } from "next/router";
import {
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const contacts = () => {
  const router = useRouter();

  return (
    <>
      <Container maxWidth="xl">
        <SecondNavBar path="Home / Contacts" />

        <Grid
          alignItems="center"
          container
          size={12}
          direction={{ xs: "row", md: "row-reverse" }}
          mb="18px"
        >
          <Grid
            container
            item="true"
            justifyContent="flex-end"
            size={{ xs: 12, md: 8.5 }}
            gap={{ md: "25px", xs: 0 }}
          >
            <Grid item="true" size={{ xs: 6, md: 1 }} p={{ xs: 1, md: 0 }}>
              <Button
                fullWidth
                sx={{
                  fontSize: "18px",
                  textTransform: "none",
                  boxShadow: 0,
                }}
                color="error"
                variant="contained"
              >
                Delete
              </Button>
            </Grid>

            <Grid
              item="true"
              size={{ xs: 6, md: 2.5, lg: 1.7 }}
              p={{ xs: 1, md: 0 }}
            >
              <Button
                onClick={() => router.push("/contacts/export-via-email")}
                fullWidth
                sx={{
                  bgcolor: "#4E73DF",
                  fontSize: "18px",
                  textTransform: "none",
                  boxShadow: 0,
                }}
                variant="contained"
              >
                Export to
              </Button>
            </Grid>

            <Grid
              item="true"
              size={{ xs: 6, md: 3, lg: 2 }}
              p={{ xs: 1, md: 0 }}
            >
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
                Send Email
              </Button>
            </Grid>
            <Grid
              item="true"
              size={{ xs: 6, md: 2.7, lg: 2.5 }}
              p={{ xs: 1, md: 0 }}
            >
              <Button
                onClick={() => router.push("/contacts/create-new")}
                fullWidth
                sx={{
                  bgcolor: { xs: "#4E73DF", md: "#28A745" },
                  fontSize: "18px",
                  textTransform: "none",
                  boxShadow: 0,
                }}
                variant="contained"
              >
                Create New
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

export default contacts;
