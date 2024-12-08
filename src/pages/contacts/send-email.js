import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { EmailSend } from "@/pages/api/contact";
import SecondNavBar from "@/components/SecondNavBar";
import SnackbarAlert from "@/components/SnackbarAlert";
import FormValidator from "@/components/FormValidator";
import CustomTextField from "@/components/CustomTextField";
import { Container, Button, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const SendEmail = () => {
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  const [formData, setFormData] = useState({
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    body: "",
  });

  const emptyFields = FormValidator({
    formData,
    excludedFields: ["cc", "bcc"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { mutateAsync: EmailSendMutate } = useMutation({
    mutationFn: (data) => EmailSend(data),
    onSuccess: () => {
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Email send successful!");
      router.push("/home/contacts");
    },
    onError: (error) => {
      console.error("Error registering:", error);
      setOpenSnackbar(true);
      if (error.response.status === 404) {
        setSnackbarSeverity("error");
        setSnackbarMessage("User not found. Please check the email address.");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emptyFields.length > 0) {
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setSnackbarMessage(
        `Please fill the following required fields: ${emptyFields.join(", ")}`
      );
      return;
    }

    EmailSendMutate(formData);
  };

  return (
    <>
      <Container maxWidth="xl">
        <SecondNavBar path="Home / Contact / Send email" />
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container size={12} direction="row" mb={{ xs: 0, md: "18px" }}>
            <Grid
              container
              justifyContent="flex-end"
              item="true"
              size={{ xs: 12, md: 12, lg: 12 }}
              direction={{ xs: "row-reverse", md: "row" }}
              columnSpacing="22px"
            >
              <Grid
                item="true"
                size={{ xs: 6, md: 3, lg: 1.3 }}
                py={{ xs: 1, md: 0 }}
              >
                <Button
                  onClick={() => router.push("/home/contacts")}
                  fullWidth
                  color="error"
                  variant="contained"
                  sx={{
                    fontSize: "18px",
                    textTransform: "none",
                    boxShadow: "none",
                  }}
                >
                  Discard
                </Button>
              </Grid>
              <Grid
                item="true"
                size={{ xs: 6, md: 3, lg: 1.3 }}
                py={{ xs: 1, md: 0 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "#4E73DF",
                    fontSize: "18px",
                    textTransform: "none",
                    boxShadow: "none",
                  }}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            bgcolor="white"
            container
            columnSpacing={4}
            rowSpacing={3}
            size={12}
            py="39px"
            pl="35px"
            pr="49px"
            flexDirection="column"
            alignItems="flex-end"
          >
            <Grid container alignItems="center" item="true" size={12}>
              <Grid item="true" size={1}>
                <Typography
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "20px",
                    textAlign: "right",
                  }}
                >
                  To:
                </Typography>
              </Grid>
              <Grid item="true" size={11}>
                <CustomTextField
                  fullWidth
                  name="to"
                  onChange={handleChange}
                  placeholder="abc@xyz.com"
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" item="true" size={12}>
              <Grid item="true" size={1}>
                <Typography
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "20px",
                    textAlign: "right",
                  }}
                >
                  CC:
                </Typography>
              </Grid>
              <Grid item="true" size={5.3}>
                <CustomTextField
                  fullWidth
                  name="cc"
                  onChange={handleChange}
                  placeholder="abc@xyz.com"
                />
              </Grid>
              <Grid item="true" size={0.7}>
                <Typography
                  sx={{ color: "black", fontWeight: "bold", fontSize: "20px" }}
                >
                  BCC:
                </Typography>
              </Grid>
              <Grid item="true" size={5}>
                <CustomTextField
                  fullWidth
                  name="bcc"
                  onChange={handleChange}
                  placeholder="abc@xyz.com"
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" item="true" size={12}>
              <Grid item="true" size={1}>
                <Typography
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "20px",
                    textAlign: "right",
                  }}
                >
                  Subject:
                </Typography>
              </Grid>
              <Grid item="true" size={11}>
                <CustomTextField
                  name="subject"
                  fullWidth
                  onChange={handleChange}
                  placeholder="abc@xyz.com"
                />
              </Grid>
            </Grid>
            <Grid item="true" size={11}>
              <CustomTextField
                name="body"
                onChange={handleChange}
                fullWidth
                placeholder="Message"
                multiline
                rows={15}
              />
            </Grid>
          </Grid>
        </Box>
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

export default SendEmail;
