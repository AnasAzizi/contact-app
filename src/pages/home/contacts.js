import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UserTable from "@/components/UserTable";
import SecondNavBar from "@/components/SecondNavBar";
import { useRouter } from "next/router";
import {
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ShowContact, deleteContact } from "@/pages/api/contact";

const contacts = () => {
  const [selectedRows, setSelectedRows] = useState("");
  const handleSelectedRows = (newSelected) => {
    console.log("Selected rows in Parent:", newSelected);
    setSelectedRows(newSelected);
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: contactDelete } = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("deleted Contact successful!");
    },
  });

  const handleDelete = (contactId) => {
    if (contactId.length !== 1) {
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Select one user please.");
      return;
    }

    contactDelete(contactId);
  };

  const { data, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: ShowContact,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        console.log("Fetched contacts data:", data);
      }
      if (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchData();
  }, [data, error]);

  if (!data) {
    return <div>No data available.</div>;
  }

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
            justifyContent={{ xs: "space-between", md: "flex-end" }}
            size={{ xs: 12, md: 9, lg: 8.5 }}
            gap={{ md: "25px", xs: "10px" }}
          >
            <Grid item="true" size={{ xs: 5.8, md: 1.2, lg: 1 }}>
              <Button
                onClick={() => handleDelete(selectedRows)}
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

            <Grid item="true" size={{ xs: 5.8, md: 2.2, lg: 1.7 }}>
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

            <Grid item="true" size={{ xs: 5.8, md: 2.5, lg: 2 }}>
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
              size={{ xs: 5.8, md: 2.7, lg: 2.5 }}
              // p={{ xs: 1, md: 0 }}
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
        <UserTable
          data={data}
          favorite={true}
          onSelectRows={handleSelectedRows}
        />
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default contacts;
