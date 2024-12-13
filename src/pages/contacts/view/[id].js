import React, { useState, useContext, useEffect } from "react";
import { CurrnetUserContext } from "@/Context/Context";
import { useMutation } from "@tanstack/react-query";
import { ViewContact } from "@/pages/api/contact";
import { useRouter } from "next/router";
import Head from "next/head";
import ContactFromGrid from "@/components/ContactFromGrid";
import Breadcrumbs from "@/components/layouts/Breadcrumbs";
import EditButton from "@/components/Buttons/EditButton";
import BackButton from "@/components/Buttons/BackButton";
import Loader from "@/components/layouts/Loader";
import {
  Card,
  Container,
  Typography,
  Avatar,
  Box,
  Switch,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

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

  const fields = contact ? (
    [
      { label: "First name", name: "firstName", value: contact.firstName },
      { label: "Last name", name: "lastName", value: contact.lastName },
      { label: "Email", name: "email", value: contact.email },
      {
        label: "Phone",
        name: "phoneNumber",
        value: contact.phoneNumber,
      },
      {
        label: "Email 2",
        name: "emailTwo",
        value: contact.emailTwo,
      },
      {
        label: "Mobile",
        name: "mobileNumber",
        value: contact.mobileNumber,
      },
      {
        label: "Address",
        name: "address",
        value: contact.address,
        multiline: true,
        rows: 4,
      },
      {
        label: "Address 2",
        name: "addressTwo",
        value: contact.addressTwo,
        multiline: true,
        rows: 4,
      },
    ]
  ) : (
    <Loader />
  );

  return isPending ? (
    <Loader />
  ) : (
    <>
      <Head>
        <title>View Contact</title>
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
                {fields.map((field) => (
                  <ContactFromGrid
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={field.value || ""}
                    disabled
                    multiline={field.multiline || false}
                    rows={field.rows || 1}
                  />
                ))}
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
                    <EditButton path={`/contacts/edit/${id}`} />
                  </Grid>
                )}
                <Grid item="true" size={{ xs: 12, sm: 5.7, md: 2 }}>
                  <BackButton path="/contacts" />
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
