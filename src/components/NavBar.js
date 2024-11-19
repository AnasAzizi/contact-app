import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";

const pages = [
  { name: "Home", path: "/home/home-page" },
  { name: "Contacts", path: "/home/contacts" },
  { name: "Company Profile", path: "/home/company-profile" },
  { name: "Users", path: "/home/users" },
];
const NavbarPages = [
  { name: "Home", path: "/home/home-page" },
  { name: "Contact", path: "/home/contacts" },
  { name: "Company Profile", path: "/home/company-profile" },
  { name: "Users", path: "/home/users" },
  {
    name: "Username",
    path: "/home/username",
    icon: <PersonIcon sx={{ fontSize: "24px", mr: "8px" }} />,
  },
  { name: "My Profile", path: "/home/my-profile" },
  { name: "Log Out", path: "/home/logout" },
];
const settings = ["My Profile", "Log out"];

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box onClick={toggleDrawer(false)}>
      <List sx={{ p: 0 }}>
        <ListItem sx={{ bgcolor: "#4E73DF", justifyContent: "space-between" }}>
          <ListItemIcon>
            <Image
              src="/Logo_White.svg"
              width={168}
              height={34}
              alt="logo"
              priority={true}
            />
          </ListItemIcon>
          <IconButton sx={{ color: "white" }} edge="end">
            <CloseIcon sx={{ fontSize: "33px" }} />
          </IconButton>
        </ListItem>
        <Divider />
      </List>

      {NavbarPages.map(({ name, path, icon }) => (
        <List key={name}>
          <ListItem sx={{ p: 0 }}>
            <Link href={path}>
              <ListItemText
                primaryTypographyProps={{ style: { fontSize: "18px" } }}
                primary={
                  <>
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      {name}
                      {icon}
                    </Box>
                  </>
                }
                sx={{ pl: "29px", pt: "17px", pb: "19px" }}
              />
            </Link>
          </ListItem>
          <Divider />
        </List>
      ))}
    </Box>
  );

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
            <Box sx={{ display: { xs: "flex", md: "none" }, mr: "63px" }}>
              <IconButton onClick={toggleDrawer(true)} color="inherit">
                <MenuIcon />
              </IconButton>
              <Drawer
                PaperProps={{
                  sx: { width: "90%" },
                }}
                open={open}
                onClose={toggleDrawer(false)}
              >
                {DrawerList}
              </Drawer>
            </Box>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              ml: "20px",
            }}
          >
            {pages.map((page) => (
              <Link href={page.path} passHref key={page.name}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    textTransform: "none",
                    fontSize: "16px",
                    ml: "20px",
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
