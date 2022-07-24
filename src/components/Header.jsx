import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login";

import { Menu, MenuItem } from "@mui/material";

import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import SearchBar from "./SearchBar";

const Header = () => {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const responseFacebook = (response) => {
    localStorage.setItem("user", JSON.stringify(response));
    if (response.status === "unknown") {
      alert("Login failed!");
      setLogin(false);
      return false;
    }
    setData(response);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setLogin(true);
      setData(JSON.parse(loggedInUser));
    }
  }, [login]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters={true}>
          <Link to="/">
            <Typography variant="h6" component="span" sx={{ color: "#fff" }}>
              RickAndMorty API
            </Typography>
          </Link>
          <SearchBar />
          <Box sx={{ flexGrow: 1 }} />
          {!login ? (
            <FacebookLogin
              appId="5147702471995467"
              autoLoad={false}
              fields="name,picture"
              scope="public_profile"
              size="small"
              callback={responseFacebook}
              render={(renderProps) => (
                <Button onClick={renderProps.onClick} color="inherit">
                  Login
                </Button>
              )}
            />
          ) : (
            <div>
              <Avatar
                onClick={handleMenu}
                alt={data.name}
                src={data.picture.data.url}
              />
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>Liked</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
