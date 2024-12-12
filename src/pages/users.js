import React, { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ShowUsers, UserDelete } from "@/pages/api/user";
import { CurrnetUserContext } from "@/Context/Context";
import { useRouter } from "next/router";
import Head from "next/head";
import SnackbarAlert from "@/components/layouts/SnackbarAlert";
import DeleteButton from "@/components/Buttons/DeleteButton";
import UserTable from "@/components/Tables/UserTable";
import Breadcrumbs from "@/components/layouts/Breadcrumbs";
import Loader from "@/components/layouts/Loader";
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
  const currentUser = useContext(CurrnetUserContext);
  const userRole = currentUser.currentUser.role;

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSelectedId = (newSelected) => {
    setSelectedIds(newSelected);
  };

  const { data, isLoading } = useQuery({
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

  const handleDelete = () => {
    selectedIds.forEach((id) => UserDeleteMutate(id));
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Container maxWidth="xl">
        <Breadcrumbs path={router.pathname} />
        <Grid container size={12} direction="row" mb={{ xs: 0, md: "18px" }}>
          <Grid item="true" size={{ xs: 12, md: 3.5, lg: 2.5 }}>
            <FormControl
              fullWidth
              size="small"
              variant="outlined"
              sx={{
                bgcolor: "white",
                mb: { xs: "10px", md: 0 },
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
          {userRole !== "User" && (
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
                mb={{ xs: "10px", md: 0 }}
              >
                {/* <Button
                  fullWidth
                  onClick={handleDelete}
                  color="error"
                  variant="contained"
                  disabled={selectedIds.length === 0}
                  sx={{
                    fontSize: "18px",
                    textTransform: "none",
                    boxShadow: 0,
                    bgcolor: "#DC3545",
                    color: "white",
                    "&.Mui-disabled": {
                      bgcolor: "#F1B0B7",
                      color: "white",
                    },
                  }}
                >
                  Delete
                </Button> */}
                <DeleteButton handleDelete={handleDelete} selectedIds={selectedIds} />

              </Grid>
              <Grid
                item="true"
                size={{ xs: 7.5, md: 3.8, lg: 2.9 }}
                mb={{ xs: "10px", md: 0 }}
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
          )}
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
