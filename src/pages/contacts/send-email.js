import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import {
  Container,
  Divider,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const SendEmail = () => {
  const [formats, setFormats] = useState(() => ["bold", "italic"]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <Typography mt={6} mb={1} variant="h5" color="black">
          Home / Contacts / Send email
        </Typography>
        <Divider sx={{ mb: "31px" }} />
        <Box
          component="div"
          sx={{
            mb: "18px",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FormControl
            variant="outlined"
            sx={{ bgcolor: "white", minWidth: "391px" }}
          >
            <InputLabel sx={{ color: "#868E96", fontSize: "16px" }}>
              Search
            </InputLabel>
            <OutlinedInput label="Search" type="text"></OutlinedInput>
          </FormControl>

          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "22px",
              mt: { xs: 2, md: 0 },
            }}
          >
            <Button
              sx={{ fontSize: "18px", width: "142px", textTransform: "none" }}
              color="error"
              variant="contained"
            >
              Discard
            </Button>
            <Button
              sx={{
                bgcolor: "#4E73DF",
                fontSize: "18px",
                width: "142px",
                textTransform: "none",
              }}
              variant="contained"
            >
              Send
            </Button>
          </Box>
        </Box>
        <Grid pl={3} container sx={{ bgcolor: "#ffffff" }} maxWidth="xl">
          <Grid size={12}>
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                width: "92.4%",
                mt: "39px",
                mb: "22px",
              }}
            >
              <Typography
                sx={{
                  color: "black",
                  fontSize: "20px",
                  fontWeight: "bold",
                  pl: "82px",
                }}
              >
                To:
              </Typography>
              <FormControl
                variant="outlined"
                sx={{
                  bgcolor: "white",
                  width: "100%",
                  flexGrow: 1,
                }}
              >
                <InputLabel sx={{ color: "#868E96", fontSize: "16px" }}>
                  abc@xyz.com
                </InputLabel>
                <OutlinedInput
                  sx={{ borderRadius: "8px" }}
                  label="abc@xyz.com"
                  type="text"
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid size={6}>
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                width: "95%",
                mb: "22px",
              }}
            >
              <Typography
                sx={{
                  color: "black",
                  fontSize: "20px",
                  fontWeight: "bold",
                  pl: "77px",
                }}
              >
                CC:
              </Typography>
              <FormControl
                variant="outlined"
                sx={{
                  bgcolor: "white",
                  width: "100%",
                  flexGrow: 1,
                }}
              >
                <InputLabel sx={{ color: "#868E96", fontSize: "16px" }}>
                  abc@xyz.com
                </InputLabel>
                <OutlinedInput
                  sx={{ borderRadius: "8px" }}
                  label="abc@xyz.com"
                  type="text"
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid size={6}>
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                width: "85%",
                mb: "22px",
              }}
            >
              <Typography
                sx={{ color: "black", fontSize: "20px", fontWeight: "bold" }}
              >
                BCC:
              </Typography>
              <FormControl
                variant="outlined"
                sx={{
                  bgcolor: "white",
                  width: "100%",
                  flexGrow: 1,
                }}
              >
                <InputLabel sx={{ color: "#868E96", fontSize: "16px" }}>
                  abc@xyz.com
                </InputLabel>
                <OutlinedInput
                  sx={{ borderRadius: "8px" }}
                  label="abc@xyz.com"
                  type="text"
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid size={12}>
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                width: "92.4%",
                mb: "18px",
              }}
            >
              <Typography
                sx={{
                  color: "black",
                  fontSize: "20px",
                  fontWeight: "bold",
                  pl: "82px",
                }}
              >
                To:
              </Typography>
              <FormControl
                variant="outlined"
                sx={{
                  bgcolor: "white",
                  width: "100%",
                  flexGrow: 1,
                }}
              >
                <InputLabel sx={{ color: "#868E96", fontSize: "16px" }}>
                  abc@xyz.com
                </InputLabel>
                <OutlinedInput
                  sx={{ borderRadius: "8px" }}
                  label="abc@xyz.com"
                  type="text"
                />
              </FormControl>
            </Box>
          </Grid>

          <Grid>
            <ToggleButtonGroup value={formats} onChange={handleFormat}>
              <ToggleButton value="bold" aria-label="bold">
                <FormatBoldIcon />
              </ToggleButton>
              <ToggleButton value="italic" aria-label="italic">
                <FormatItalicIcon />
              </ToggleButton>
              <ToggleButton value="underlined" aria-label="underlined">
                <FormatUnderlinedIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SendEmail;
