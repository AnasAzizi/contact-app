import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ShowContact, DeleteContact } from "@/pages/api/contact";
import { useCurrentUser } from "@/Context/Context";
import { useRouter } from "next/router";
import Head from "next/head";
import ContactTable from "@/components/Tables/ContactTable";
import Breadcrumbs from "@/components/layouts/Breadcrumbs";
import SnackbarAlert from "@/components/layouts/SnackbarAlert";
import DeleteButton from "@/components/Buttons/DeleteButton";
import Loader from "@/components/layouts/Loader";
import { Container, FormControl, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Contacts = () => {
  const { currentUser } = useCurrentUser();

  const router = useRouter();
  const queryClient = useQueryClient();
  const userRole = currentUser.role;
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

  const { mutateAsync: DeleteContactMutate } = useMutation({
    mutationFn: DeleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Deleted contact successfully!");
      setResetSelection(true);
    },
  });

  const handleDelete = () => {
    selectedIds.forEach((id) => DeleteContactMutate(id));
  };

  const { data, isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: ShowContact,
  });

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <Container maxWidth="xl">
        <Breadcrumbs path={router.pathname} />
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
                <DeleteButton
                  handleDelete={handleDelete}
                  selectedIds={selectedIds}
                />
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
          onResetComplete={() => setResetSelection(false)}
          search={search}
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
