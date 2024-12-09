import React, { useState, useContext, useEffect } from "react";
import { CurrnetUserContext } from "@/Context/Context";
import { useMutation } from "@tanstack/react-query";
import { ViewContact } from "@/pages/api/contact";
import { useRouter } from "next/router";
import Head from "next/head";
import SecondNavBar from "@/components/SecondNavBar";
import CustomTextField from "@/components/CustomTextField";
import Loader from "@/components/Loader";
import {
  Card,
  Container,
  Typography,
  Avatar,
  Button,
  Box,
  Switch,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import EditOffOutlinedIcon from "@mui/icons-material/EditOffOutlined";

const View = () => {
  const router = useRouter();
  const { id } = router.query;
  const currentUser = useContext(CurrnetUserContext);
  const userRole = currentUser.currentUser.role;

  const [contact, setContact] = useState(null);

  const { mutateAsync: ViewContactMutate, isPending } = useMutation({
    mutationFn: () => ViewContact(id),
  });
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await ViewContactMutate();
        setContact(data);
      } catch (err) {
        console.error("Error fetching contact:", err);
      }
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
        <title>View Contact</title>
      </Head>
      {contact && (
        <Container maxWidth="xl">
          <SecondNavBar
            path={`Home / Contacts /${contact.firstName} ${contact.lastName}`}
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
              <Typography fontSize="20px" sx={{ pr: "18px" }}>
                {contact.status === "Active" ? "Active" : "Inactive"}
              </Typography>
              <Switch
                disabled
                name="status"
                checked={contact.status === "Active"}
              />
            </Box>
          </Card>
          <Grid
            container
            pt="45px"
            size={12}
            direction={{ xs: "column", md: "row" }}
            bgcolor="white"
            sx={{ boxShadow: 3 }}
          >
            <Grid
              container
              item="true"
              size={{ xs: 12, md: 12, lg: 3 }}
              direction="column"
              alignItems="center"
            >
              <Grid item="true" xs={12}>
                <Avatar sx={{ width: 202, height: 202 }} />
              </Grid>
              <Grid item="true" xs={12}>
                <Typography color="black" fontSize="24px" sx={{ my: "20px" }}>
                  {contact.firstName} {contact.lastName}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item="true"
              size={{ xs: 12, md: 12, lg: 9 }}
              pr="32px"
              pl={{ xs: "32px", md: 0 }}
            >
              <Grid
                item="true"
                container
                justifyContent="center"
                size={12}
                direction={{ xs: "column", md: "row" }}
                columnSpacing="26px"
                rowSpacing="26px"
                wrap="wrap"
              >
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    First name
                  </Typography>
                  <CustomTextField
                    fullWidth
                    name="firstName"
                    defaultValue={contact.firstName || ""}
                    disabled
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Last name
                  </Typography>
                  <CustomTextField
                    fullWidth
                    name="lastName"
                    defaultValue={contact.lastName || ""}
                    disabled
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Email
                  </Typography>
                  <CustomTextField
                    fullWidth
                    name="email"
                    defaultValue={contact.email || ""}
                    disabled
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Phone
                  </Typography>
                  <CustomTextField
                    fullWidth
                    name="phoneNumber"
                    defaultValue={contact.phoneNumber || ""}
                    disabled
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Email 2
                  </Typography>
                  <CustomTextField
                    fullWidth
                    name="emailTwo"
                    defaultValue={contact.emailTwo || ""}
                    disabled
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Mobile
                  </Typography>
                  <CustomTextField
                    fullWidth
                    name="mobileNumber"
                    defaultValue={contact.mobileNumber || ""}
                    disabled
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Address
                  </Typography>
                  <CustomTextField
                    fullWidth
                    multiline
                    rows={4}
                    name="address"
                    disabled
                    value={contact.address || ""}
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Address 2
                  </Typography>
                  <CustomTextField
                    fullWidth
                    multiline
                    rows={4}
                    name="addressTwo"
                    disabled
                    value={contact.addressTwo || ""}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                size={12}
                mb="47px"
                mt="33px"
                ml={{ md: "27px" }}
                gap={{ xs: 3, md: 10 }}
              >
                {userRole !== "User" && (
                  <Grid item="true" size={{ xs: 12, sm: 5.7, md: 2 }}>
                    <Button
                      onClick={() => router.push(`/contacts/edit/${id}`)}
                      fullWidth
                      sx={{
                        textTransform: "none",
                        fontSize: "20px",
                        color: "#4E73DF",
                      }}
                      variant="outlined"
                      startIcon={<EditOffOutlinedIcon />}
                    >
                      Edit
                    </Button>
                  </Grid>
                )}
                <Grid item="true" size={{ xs: 12, sm: 5.7, md: 2 }}>
                  <Button
                    onClick={() => router.push("/home/contacts")}
                    fullWidth
                    variant="outlined"
                    bgcolor="#4E73DF"
                    sx={{
                      textTransform: "none",
                      fontSize: "20px",
                      color: "#4E73DF",
                    }}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default View;
