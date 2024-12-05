import React, { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CurrnetUserContext } from "@/Context/Context";
import ContactTable from "@/components/ContactTable";
import SecondNavBar from "@/components/SecondNavBar";
import SnackbarAlert from "@/components/SnackbarAlert";
import { useRouter } from "next/router";
import { Container, FormControl, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ShowContact, DeleteContact } from "@/pages/api/contact";

const Contacts = () => {
  const currentUser = useContext(CurrnetUserContext);
  const userRole = currentUser.currentUser.role;


  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [resetSelection, setResetSelection] = useState(false);

  const handleSelectedId = (newSelected) => {
    setSelectedIds(newSelected);
    console.log("Selected rows in Parent:", newSelected);
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: DeleteContactMutate } = useMutation({
    mutationFn: DeleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Deleted contact successfully!");
      setSelectedIds([]);
    },
  });

  const handleDelete = () => {
    if (selectedIds.length === 0) {
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Please select at least one contact to delete.");
      return;
    }
    selectedIds.forEach((id) => DeleteContactMutate(id));
    setSelectedIds([]);
    setResetSelection(true);
  };

  const { data } = useQuery({
    queryKey: ["contacts"],
    queryFn: ShowContact,
  });

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
            justifyContent={{ md: "flex-end" }}
            size={{ xs: 12, md: 9, lg: 8.5 }}
            gap={{ md: "25px" }}
            rowSpacing={{ xs: "13px", md: "0px" }}
            columnSpacing={{ xs: "13px", md: "0px" }}
          >
            {userRole !== "User" && (
              <Grid item="true" size={{ xs: 6, md: 1.2, lg: 1 }}>
                <Button
                  onClick={handleDelete}
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
            )}

            <Grid item="true" size={{ xs: 6, md: 2.2, lg: 1.7 }}>
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

            <Grid item="true" size={{ xs: 6, md: 2.5, lg: 2 }}>
              <Button
                onClick={() => router.push("/contacts/send-email")}
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
            {userRole !== "User" && (
              <Grid item="true" size={{ xs: 6, md: 2.7, lg: 2.5 }}>
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
            )}
          </Grid>
          <Grid item="true" size={{ xs: 12, md: 3, lg: 3.5 }}>
            <FormControl
              fullWidth
              sx={{
                bgcolor: "white",
                mt: { xs: "11px", md: 0 },
              }}
            >
              <TextField
                size="small"
                variant="outlined"
                placeholder="Search"
                type="search"
                onInput={(e) => setSearch(e.target.value)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <ContactTable
          data={data}
          onSelectRows={handleSelectedId}
          search={search}
          onResetComplete={() => setResetSelection(false)}
          resetSelection={resetSelection}
        />
      </Container>
      <SnackbarAlert
        open={openSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default Contacts;
