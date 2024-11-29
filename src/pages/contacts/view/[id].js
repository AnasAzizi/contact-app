import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import SecondNavBar from "@/components/SecondNavBar";
import { useRouter } from "next/router";
import {
  Card,
  Container,
  Typography,
  Avatar,
  Button,
  TextField,
  FormControl,
  OutlinedInput,
  Box,
  Switch,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import EditOffOutlinedIcon from "@mui/icons-material/EditOffOutlined";
import { viewContact } from "@/pages/api/contact";

const View = () => {
  const router = useRouter();
  const { id } = router.query;
  const [contact, setContact] = useState(null);

  const { mutateAsync: contactView } = useMutation({
    mutationFn: () => viewContact(id),
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await contactView();
        console.log("data", data);
        setContact(data);
      } catch (err) {
        console.error("Error fetching contact:", err);
      }
    };

    if (id) {
      fetchContact();
    }
  }, [id, contactView]);

  return (
    <>
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
              <Typography>Active</Typography>
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
                  <FormControl size="small" variant="outlined" fullWidth>
                    <OutlinedInput
                      value={contact.firstName || ""}
                      readOnly
                      type="text"
                    />
                  </FormControl>
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Last name
                  </Typography>
                  <FormControl size="small" variant="outlined" fullWidth>
                    <OutlinedInput
                      value={contact.lastName || ""}
                      readOnly
                      type="text"
                    />
                  </FormControl>
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Email
                  </Typography>
                  <FormControl size="small" variant="outlined" fullWidth>
                    <OutlinedInput
                      value={contact.email || ""}
                      readOnly
                      type="email"
                    />
                  </FormControl>
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Phone
                  </Typography>
                  <FormControl size="small" variant="outlined" fullWidth>
                    <OutlinedInput
                      value={contact.phoneNumber || ""}
                      readOnly
                      type="number"
                    ></OutlinedInput>
                  </FormControl>
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Email 2
                  </Typography>
                  <FormControl size="small" variant="outlined" fullWidth>
                    <OutlinedInput
                      value={contact.emailTwo || ""}
                      readOnly
                      type="text"
                    ></OutlinedInput>
                  </FormControl>
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Mobile
                  </Typography>
                  <FormControl size="small" variant="outlined" fullWidth>
                    <OutlinedInput
                      value={contact.mobileNumber || ""}
                      readOnly
                      type="text"
                    ></OutlinedInput>
                  </FormControl>
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Address
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Address"
                    multiline
                    rows={3}
                    value={contact.address || ""}
                    readOnly
                  />
                </Grid>
                <Grid item="true" size={{ xs: 12, md: 5.7 }}>
                  <Typography mb="12px" color="black" fontSize="20px">
                    Address 2
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Address 2"
                    multiline
                    rows={3}
                    value={contact.addressTwo || ""}
                    readOnly
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
                <Grid item="true" size={{ xs: 12, sm: 5, md: 2 }}>
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
                <Grid item="true" size={{ xs: 12, sm: 5, md: 2 }}>
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
