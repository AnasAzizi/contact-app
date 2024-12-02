import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ShowUsers, UserDelete } from "@/pages/api/user";
import UserTable from "@/components/UserTable";
import SecondNavBar from "@/components/SecondNavBar";
import SnackbarAlert from "@/components/SnackbarAlert";
import { useRouter } from "next/router";
import {
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const Users = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [resetSelection, setResetSelection] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSelectedId = (newSelected) => {
    setSelectedIds(newSelected);
    console.log("Selected rows in Parent:", newSelected);
  };

  const { data } = useQuery({
    queryKey: ["getUsers"],
    queryFn: ShowUsers,
  });

  const { mutateAsync: UserDeleteMutate } = useMutation({
    mutationFn: UserDelete,
    onSuccess: () => {
      queryClient.invalidateQueries(["getUsers"]);
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Deleted contact successfully!");
      setResetSelection(true);
      setSelectedIds([]);
    },
  });

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Please select at least one user to delete.");
      return;
    }
    try {
      await Promise.all(selectedIds.map((id) => UserDeleteMutate(id)));
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <>
      <Container maxWidth="xl">
        <SecondNavBar path="Home / Users" />
        <Grid container size={12} direction="row" mb={{ xs: 0, md: "18px" }}>
          <Grid item="true" size={{ xs: 12, md: 3.5, lg: 2.5 }}>
            <FormControl
              fullWidth
              size="small"
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
              <OutlinedInput
                label="Search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            alignItems="center"
            item="true"
            size={{ xs: 12, md: 8.5, lg: 9.5 }}
            direction={{ xs: "row-reverse", md: "row" }}
            columnSpacing="22px"
          >
            <Grid
              item="true"
              size={{ xs: 4.5, md: 1.5, lg: 1.5 }}
              py={{ xs: 1, md: 0 }}
            >
              <Button
                fullWidth
                onClick={handleDelete}
                color="error"
                variant="contained"
                sx={{
                  fontSize: "18px",
                  textTransform: "none",
                  boxShadow: "none",
                }}
              >
                Delete
              </Button>
            </Grid>
            <Grid
              item="true"
              size={{ xs: 7.5, md: 3.8, lg: 2.9 }}
              py={{ xs: 1, md: 0 }}
            >
              <Button
                onClick={() => router.push("/users/invite-new-user")}
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "#4E73DF",
                  fontSize: "18px",
                  textTransform: "none",
                  boxShadow: "none",
                }}
              >
                Invite New User
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <UserTable
          onSelectRows={handleSelectedId}
          onResetComplete={() => setResetSelection(false)}
          data={data}
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

export default Users;
