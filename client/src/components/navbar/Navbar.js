import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from "../../assets/APK_logo.png";
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import GoogleButton from 'react-google-button';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';


import { setAuthUser, setIsAuthenticated } from '../../redux/appSlice';
import { Link, useNavigate } from 'react-router-dom';
const pages = ['Dashboard', 'Events'];
const settings = [{name: 'Profile', link:"/profile"}, {name : 'Dashboard', link:"/dashboard"}, {name : 'Logout', link:"/api/logout"}];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useSelector(state => state.app.authUser);

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

  React.useEffect(() => {
    fetchAuthUser();
  },[])

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchAuthUser = async () => {
    const response = await axios.get("/api/auth/user", { withCredentials: true }).catch((err) => {
      dispatch(setIsAuthenticated(false));
      dispatch(setAuthUser(null));
    });

    if (response && response.data) {
      dispatch(setIsAuthenticated(true));
      dispatch(setAuthUser(response.data));
      
    }
  }

  const redirectToGoogleSSO = async () => {
    let timer = null;
    const googleLoginURL = "/api/login/google";
    const newWindow = window.open(googleLoginURL, "_blank", "width=500,height=600");

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log("Yes you have been logged in..");
          fetchAuthUser();
          if (timer) clearInterval(timer);
        }
      }, 500)
    }
  }

  const handleLogout = async () => {
    const response = await axios.get("/api/logout", { withCredentials: true }).catch((err) => {
      console.log("Some Error occurred logging out", err);
    });

    if (response && response.data) {
      console.log("User Logged Out: ", response.data);
      if(response.data.message==="Logged Out"){

        dispatch(setIsAuthenticated(false));
        dispatch(setAuthUser(null));
      }
    }
  }

  return (
    <AppBar position="static" color='secondary'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <img src={logo} height="40px" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"

            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {
              user?
              <MenuItem component={Link} to={'/dashboard'} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              :
              null
              }
              <MenuItem component={Link} to={'/events'} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Events</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img src={logo} height="40px" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', paddingRight: 3 }}>

            {
              user?

            <Button
              sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to={'/dashboard'}
            >
              Dashboard
            </Button>
            :
            null
            }
            <Button

              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link} to={'/events'}
            >
              Events
            </Button>
          </Box>
          {user ?
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={user.picture} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                  <MenuItem component={Link} to={"/profile"} >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout} >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
              </Menu>
            </Box>
            :
            <Button variant='contained' color="success" onClick={redirectToGoogleSSO} > Log In <LoginSharpIcon /> </Button>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;