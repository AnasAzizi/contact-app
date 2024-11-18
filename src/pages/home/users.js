import UserTable from "@/components/UserTable";
import userData from "@/data/userData.json";
import SecondNavBar from "@/components/SecondNavBar";
import { useRouter } from "next/router";
import {
  Container,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const users = () => {
  const router = useRouter();

  return (
    <>
      <Container maxWidth="xl">
        <SecondNavBar path="Home / Users" />
        <Grid container size={12} direction="row" mb={{ xs: 0, md: "18px" }}>
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
                onClick={() => router.push("/users/invite-new-user")}
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
