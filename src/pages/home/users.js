import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ShowUsers } from "@/pages/api/user";
import UserTable from "@/components/UserTable";
import SecondNavBar from "@/components/SecondNavBar";
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
  const [search, setSearch] = useState("");

  const { data, error, isLoading } = useQuery({
    queryKey: ["getUsers"],
    queryFn: ShowUsers,
  });

  useEffect(() => {
    if (data) {
      console.log("Fetched users data:", data);
    }
    if (error) {
      console.error("Error fetching users:", error);
    }
  }, [data, error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
              size={{ xs: 6, md: 1.5, lg: 1.5 }}
              py={{ xs: 1, md: 0 }}
            >
              <Button
                fullWidth
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
              size={{ xs: 6, md: 3.8, lg: 2.9 }}
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
        <UserTable data={data} favorite={false} search={search} />
      </Container>
    </>
  );
};

export default Users;
