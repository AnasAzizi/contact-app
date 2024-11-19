import Box from "@mui/material/Box";
import { Typography, Container } from "@mui/material";
import Divider from "@mui/material/Divider";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        color: "#000000",
        backgroundColor: "#F5F5F5",
      }}
    >
      <Divider
        sx={{
          mb: "16.5px",
        }}
      />

      <Container maxWidth="xl">
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: {
              xs: "center",
              md: "space-between",
            },
            opacity: "60%",
            mb: "10px",
            px: "10px",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
          }}
        >
          <Typography>
            Copyright © ITM Development | Contact Book | 2022
          </Typography>

          <Typography
            sx={{
              mt: { xs: 2, sm: 0 },
              display: { xs: "none", md: "block" },
            }}
          >
            Privacy Policy - Terms & Conditions
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
