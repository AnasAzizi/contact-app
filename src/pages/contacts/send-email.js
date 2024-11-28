import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { EmailSend } from "@/pages/api/contact";
import SecondNavBar from "@/components/SecondNavBar";
import { useRouter } from "next/router";
import {
  Container,
  Button,
  Box,
  Typography,
  TextField,
  Alert,
  Snackbar,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const SendEmail = () => {
  const router = useRouter();
  const [error, setError] = useState({});
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

  const validateEmail = () => {
    if (!formData.to) {
      setError({ to: "Email is required." });
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  console.log("formData", formData);

  const { mutateAsync: EmailSendMutate } = useMutation({
    mutationFn: (data) => EmailSend(data),
    onSuccess: () => {
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Email send successful!");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;
    await EmailSendMutate(formData);
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
            py="32px"
            pl="35px"
            pr="44px"
          >
            <Grid item="true" size={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "32px",
                }}
              >
                <Typography
                  sx={{ color: "black", fontWeight: "bold", fontSize: "20px" }}
                >
                  To:
                </Typography>
                <TextField
                  error={!!error.to}
                  size="small"
                  name="to"
                  onChange={handleChange}
                  fullWidth
                  placeholder="abc@xyz.com"
                  helperText={error.to}
                />
              </Box>
            </Grid>
            <Grid item="true" size={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "32px",
                }}
              >
                <Typography
                  sx={{ color: "black", fontWeight: "bold", fontSize: "20px" }}
                >
                  CC:
                </Typography>
                <TextField
                  size="small"
                  name="cc"
                  onChange={handleChange}
                  fullWidth
                  placeholder="abc@xyz.com"
                />
              </Box>
            </Grid>
            <Grid item="true" size={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "32px",
                }}
              >
                <Typography
                  sx={{ color: "black", fontWeight: "bold", fontSize: "20px" }}
                >
                  BCC:
                </Typography>
                <TextField
                  size="small"
                  name="bcc"
                  onChange={handleChange}
                  fullWidth
                  placeholder="abc@xyz.com"
                />
              </Box>
            </Grid>
            <Grid item="true" size={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "32px",
                }}
              >
                <Typography
                  sx={{ color: "black", fontWeight: "bold", fontSize: "20px" }}
                >
                  Subject:
                </Typography>
                <TextField
                  size="small"
                  name="subject"
                  onChange={handleChange}
                  fullWidth
                  placeholder="abc@xyz.com"
                />
              </Box>
            </Grid>
            <Grid item="true" size={12} ml={8}>
              <TextField
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SendEmail;
