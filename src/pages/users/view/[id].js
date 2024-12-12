import React, { useState, useContext, useEffect } from "react";
import { CurrnetUserContext } from "@/Context/Context";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { UserView } from "@/pages/api/user";
import Head from "next/head";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Button,
  Card,
  Select,
  Switch,
  Box,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Breadcrumbs from "@/components/layouts/Breadcrumbs";
import EditButton from "@/components/Buttons/EditButton";
import BackButton from "@/components/Buttons/BackButton";
import CustomTextField from "@/components/serveries/CustomTextField";
import Loader from "@/components/layouts/Loader";
import EditOffOutlinedIcon from "@mui/icons-material/EditOffOutlined";

const ViewUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const currentUser = useContext(CurrnetUserContext);
  const userRole = currentUser.currentUser.role;
  const [contact, setContact] = useState(null);

  const { mutateAsync: UserViewMutate, isPending } = useMutation({
    mutationFn: () => UserView(id),
  });

  useEffect(() => {
    const fetchContact = async () => {
      const data = await UserViewMutate();
      setContact(data);
    };
    if (id) {
      fetchContact();
    }
  }, [id]);

  return isPending ? (
    <Loader />
  ) : (
    <>
      <Head>
        <title>View User</title>
      </Head>
      {contact && (
        <Container maxWidth="xl">
          <Breadcrumbs
            path={router.pathname}
            name={`${contact.firstName} ${contact.lastName}`}
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
              <Typography fontSize="20px">
                {contact.status === "Active" ? "Unlocked" : "Locked"}
              </Typography>
              <Switch
                disabled
                name="status"
                checked={contact.status === "Locked"}
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
              <CustomTextField
                fullWidth
                name="firstName"
                defaultValue={contact.firstName}
                disabled
                type="text"
              />
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 6 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Last name
              </Typography>
              <CustomTextField
                fullWidth
                name="lastName"
                defaultValue={contact.lastName}
                disabled
                type="text"
              />
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 4 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Email
              </Typography>
              <CustomTextField
                fullWidth
                name="email"
                defaultValue={contact.email}
                disabled
                type="email"
              />
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 4 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                Phone
              </Typography>
              <CustomTextField
                fullWidth
                name="phoneNumber"
                defaultValue={contact.phoneNumber}
                disabled
                type="number"
              />
            </Grid>
            <Grid item="true" size={{ xs: 12, md: 4 }}>
              <Typography mb="12px" color="black" fontSize="20px">
                User Type
              </Typography>
              <FormControl size="small" variant="outlined" fullWidth disabled>
                <InputLabel>{contact.role}</InputLabel>
                <Select>
                  <MenuItem>Admin</MenuItem>
                  <MenuItem>Owner</MenuItem>
                  <MenuItem>User</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container item="true" direction="row" size={12} pt="30px">
              {userRole !== "User" && (
                <Grid item="true" size={{ xs: 6, md: 2 }}>
                  <EditButton path={`/users/edit/${id}`} />
                </Grid>
              )}
              <Grid item="true" size={{ xs: 6, md: 2 }}>
                <BackButton path="/users" />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default ViewUser;
