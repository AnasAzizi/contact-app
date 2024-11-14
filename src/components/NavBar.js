import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";
import Link from "next/link";

const pages = [
  { name: "Home", path: "/home/home-page" },
  { name: "Contacts", path: "/contacts/send-email" },
  { name: "Company Profile", path: "/company-profile" },
  { name: "Users", path: "/users" },
];
const settings = ["My Profile", "Log out"];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar sx={{ bgcolor: "#4E73DF" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: {
                md: "row",
                xs: "row-reverse",
                justifyContent: "space-around",
              },
            }}
          >
            <Image
              src="/Logo_White.svg"
              width={168}
              height={34}
              alt="logo"
              priority={true}
            />
            {/* burger menu */}
            <Box sx={{ display: { xs: "flex", md: "none" }, mr: "63px" }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Link href={page.path} passHref>
                      <Typography sx={{ textAlign: "center" }}>
                        {page.name}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link href={page.path} passHref key={page.name}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 4,
                    p: 0,
                    color: "white",
                    display: "block",
                    ml: "71px",
                    textTransform: "none",
                    fontSize: "16px",
                  }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <Tooltip title="Open settings">
              <Button
                sx={{ p: "0", textTransform: "none", fontSize: "16px" }}
                onClick={handleOpenUserMenu}
                color="#ffffff"
                startIcon={<PersonIcon style={{ fontSize: "24px" }} />}
              >
                User Name
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: "56px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    sx={{ textAlign: "left", px: "20px", display: "block" }}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
