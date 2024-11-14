import NavBar from "@/components/NavBar";
import UserTable from "@/components/UserTable";
import userData from "@/data/userData.json"
import {
  Container,
  Divider,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Box,
} from "@mui/material";

const contacts = () => {
  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <Typography mt={6} mb={1} variant="h5" color="black">
          Home / Contacts
        </Typography>
        <Divider sx={{ mb: "31px" }} />
        <Box component="div" sx={{ mb:"18px",display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "space-between" }}>

          <FormControl
            variant="outlined"
            sx={{ bgcolor: "white", minWidth: "391px" }}
          >
            <InputLabel sx={{ color: "#868E96", fontSize: "16px" }}>
              Search
            </InputLabel>
            <OutlinedInput label="Search" type="text"></OutlinedInput>
          </FormControl>

          <Box component="div" sx={{ display: "flex", alignItems: "center", gap: "22px", mt: { xs: 2, md: 0 }, }}>
            <Button sx={{ fontSize: "18px", width: "83px", textTransform: "none" }} color="error" variant="contained">
              Delete
            </Button>
            <Button sx={{ bgcolor: "#4E73DF", fontSize: "18px", width: "142px", textTransform: "none" }} variant="contained">
            Export to
            </Button>
            <Button sx={{ bgcolor: "#4E73DF", fontSize: "18px", width: "142px", textTransform: "none" }} variant="contained">
            Send Email
            </Button>
            <Button sx={{ bgcolor: "#28A745", fontSize: "18px", width: "215px", textTransform: "none" }} variant="contained">
            Create New
            </Button>
          </Box>
        </Box>

        <UserTable data={userData} favorite={true} />
      </Container>
    </>
  )
}

export default contacts