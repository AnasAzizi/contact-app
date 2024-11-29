import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Card,
  Select,
  Switch,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SecondNavBar from "@/components/SecondNavBar";
import EditOffOutlinedIcon from "@mui/icons-material/EditOffOutlined";
import { useRouter } from "next/router";
import { UserView } from "@/pages/api/user";

const ViewUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const [contact, setContact] = useState(null);

  const { mutateAsync: UserViewMutate } = useMutation({
    mutationFn: () => UserView(id),
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await UserViewMutate();
        setContact(data);
      } catch (err) {
        console.error("Error fetching contact:", err);
      }
    };

    if (id) {
      fetchContact();
    }
  }, [id, UserViewMutate]);

  return (
    <>
      {contact && (
        <Container maxWidth="xl">
          <SecondNavBar
            path={`Home / Users /${contact.firstName} ${contact.lastName}`}
          />
          <Card
            sx={{
              height: "72px",
              bgcolor: "#F7F7F7",
              boxShadow: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "23px",
                ml: "40px",
              }}
            >
              User details
            </Typography>
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mr: "40px",
              }}
            >
              <Typography>Unlocked</Typography>
              <Switch
                disabled
                name="status"
                checked={contact.status === "Active"}
              />
            </Box>
          </Card>
          <Grid
            container
            pt="44px"
            pb="39px"
            px={{ xs: "32px", md: "60px" }}
            size={12}
            direction={{ xs: "column", md: "row" }}
            bgcolor="white"
            sx={{ boxShadow: 3 }}
            rowSpacing="30px"
            columnSpacing="50px"
          >
            <Grid item="true" size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                First name
              </Typography>
              <FormControl size="small" variant="outlined" fullWidth disabled>
                <OutlinedInput value={contact.firstName} type="text" />
              </FormControl>
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Last name
              </Typography>
              <FormControl size="small" variant="outlined" fullWidth disabled>
                <OutlinedInput value={contact.lastName} type="text" />
              </FormControl>
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 4 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Email
              </Typography>
              <FormControl size="small" variant="outlined" fullWidth disabled>
                <OutlinedInput value={contact.email} type="email" />
              </FormControl>
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 4 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Phone
              </Typography>
              <FormControl size="small" variant="outlined" fullWidth disabled>
                <OutlinedInput value={contact.phoneNumber} type="number" />
              </FormControl>
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 4 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                User Type
              </Typography>
              <FormControl size="small" variant="outlined" fullWidth disabled>
                <InputLabel>{contact.role}</InputLabel>
                <Select></Select>
              </FormControl>
            </Grid>
            <Grid container item="true" direction="row" size={12} pt="30px">
              <Grid item="true" size={{ xs: 6, md: 2 }}>
                <Button
                  onClick={() => router.push(`/users/edit/${id}`)}
                  fullWidth
                  sx={{
                    textTransform: "none",
                    fontSize: "20px",
                    color: "#4E73DF",
                    borderColor: "#4E73DF",
                  }}
                  variant="outlined"
                  startIcon={<EditOffOutlinedIcon />}
                >
                  Edit
                </Button>
              </Grid>
              <Grid item="true" size={{ xs: 6, md: 2 }}>
                <Button
                  onClick={() => router.push("/home/users")}
                  fullWidth
                  bgcolor="#4E73DF"
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    borderColor: "#4E73DF",
                    color: "#4E73DF",
                    fontSize: "20px",
                  }}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default ViewUser;
