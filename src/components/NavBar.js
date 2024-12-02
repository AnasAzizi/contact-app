import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
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
  Drawer,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import ReorderIcon from "@mui/icons-material/Reorder";
import { useQuery } from "@tanstack/react-query";
import { CurrentUser } from "@/pages/api/user";
import { CurrnetUserContext } from "@/Context/Context";

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
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const currentUser = useContext(CurrnetUserContext);

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

  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("registeredName");
    if (storedName) {
      setFirstName(JSON.parse(storedName));
    }
  }, []);

  const { data } = useQuery({
    queryKey: ["currentuser"],
    queryFn: CurrentUser,
  });

  const saveCurrentUser = async () => {
    if (data) {
      // Assuming setCurrentUser is async
      await currentUser.setCurrentUser(data);
    }
  };

  saveCurrentUser();

  const DrawerList = (
    <Box onClick={toggleDrawer(false)}>
      <List sx={{ p: 0 }}>
        <ListItem
          sx={{
            bgcolor: "#4E73DF",
            justifyContent: "space-between",
            height: "61px",
            pl: "28px",
          }}
        >
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
      </List>

      {NavbarPages.map(({ name, path, icon }) => (
        <List sx={{ py: "20px", borderBottom: "1px solid #CED4DA" }} key={name}>
          <ListItem sx={{ p: 0 }}>
            <Link href={path}>
              <ListItemText
                primaryTypographyProps={{
                  style: {
                    fontSize: "18px",
                    opacity: router.pathname === path ? "100%" : "70%",
                    marginLeft:
                      name === "My Profile" || name === "Log Out"
                        ? "20px"
                        : "none",
                  },
                }}
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
                sx={{ pl: "29px" }}
              />
            </Link>
          </ListItem>
        </List>
      ))}
    </Box>
  );

  return (
    <AppBar
      sx={{ bgcolor: "#4E73DF", height: { xs: "61px", md: "82px" } }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ py: "5px" }} disableGutters>
          {/* mobile version */}
          <Box
            sx={{
              display: { xs: "inline-block", md: "none" },
            }}
          >
            <IconButton
              sx={{ p: 0 }}
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <ReorderIcon sx={{ fontSize: "37px" }} />
            </IconButton>
            <Drawer
              PaperProps={{
                sx: { width: "92%" },
              }}
              open={open}
              onClose={toggleDrawer(false)}
            >
              {DrawerList}
            </Drawer>
          </Box>

          {/* logo */}
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: {
                xs: "center",
                md: "flex-start",
              },
              alignItems: "center",
              flexDirection: {
                xs: "row-reverse",
                md: "row",
              },
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            <Link href="/home/home-page">
              <Image
                src="/Logo_White.svg"
                width={168}
                height={34}
                alt="logo"
                priority={true}
              />
            </Link>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map(({ name, path }) => (
              <Link href={path} passHref key={name}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    textTransform: "none",
                    fontSize: "16px",
                    ml: { md: "20px", lg: "70px" },
                    color: "white",
                    opacity: router.pathname === path ? "100%" : "70%",
                  }}
                >
                  {name}
                </Button>
              </Link>
            ))}
          </Box>

          {/* profile on desktop */}
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Tooltip title="Open settings">
              <Button
                sx={{
                  p: 0,
                  textTransform: "none",
                  fontSize: "16px",
                }}
                onClick={handleOpenUserMenu}
                color="#ffffff"
                startIcon={<PersonIcon style={{ fontSize: "36px" }} />}
              >
                {firstName}
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
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting === "Log out") {
                      localStorage.removeItem("jwtToken");
                      router.push("/auth/sign-in");
                    }
                    if (setting === "My Profile") {
                      router.push(`/users/view/${data.id}`);
                    }
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "left",
                      px: "20px",
                      display: "block",
                    }}
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
