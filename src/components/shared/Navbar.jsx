import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { Badge, Button, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, useEffect, useState } from 'react';
import logo from '../../../public/logo2.svg';
import axios from 'axios';
import { server } from '../../constants/config';
import Search from '../layout/Search';
import Notification from '../layout/Notification';
import { palette } from '../../themes/dark';
import { getSocket } from '../../socket';
import { NEW_REQUEST } from '../../constants/events';

const Navbar = ({ user, setUser }) => {
  const socket = getSocket();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  

  const handleLogout = async (e) => {
    // logout logic here
    e.preventDefault();
    const config = {
      withCredentials: true,
    };
    try {
      await axios
        .get(`${server}/user/logout`, config)
        .then((data) => {
          // console.log(data);
          setUser(data.success);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleSearch = () => {};
  const handleNotification = () => {};

  useEffect(() => {
    socket.on(NEW_REQUEST, (data) => {
      console.log(data);
      setShowAlert(true);
    });
    

    return () => {
      socket.off(NEW_REQUEST);
    };
  }, []);

  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: palette.primary.ok,
        }}
      >
        <Box sx={{ ml: 1, pt: 0.7 }}>
          <img
            src={logo}
            style={{ height: '6vh' }}
          />
        </Box>
        <Box
          sx={{
            mr: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Tooltip title="Notification">
            <Badge
              color="error"
              variant="dot"
              invisible={!showAlert}
            >
              <NotificationsIcon
                onClick={() => {
                  setIsNotificationOpen(true);
                  setShowAlert(false);
                }}
                sx={{
                  // mx: 4,
                  color: 'white',
                  ':hover': { opacity: 0.7 },
                  ':active': { opacity: 0.5 },
                  transition: '0.2s ease out',
                  cursor: 'pointer',
                }}
              />
            </Badge>
          </Tooltip>
          <Tooltip title="Search">
            <SearchIcon
              onClick={() => {
                setIsSearchOpen(true);
              }}
              sx={{
                mr: 2,
                ml: 4,
                color: 'white',
                ':hover': { opacity: 0.7 },
                ':active': { opacity: 0.5 },
                transition: '0.2s ease out',
                cursor: 'pointer',
              }}
            />
          </Tooltip>
          <Tooltip title="Logout">
            <Button
              onClick={(e) => {
                handleLogout(e);
              }}
            >
              <LogoutIcon
                sx={{
                  // mx: 4,
                  // mr: 2,
                  color: 'white',
                  ':hover': { opacity: 0.7 },
                  ':active': { opacity: 0.5 },
                  transition: '0.2s ease out',
                  cursor: 'pointer',
                }}
              />
            </Button>
          </Tooltip>
        </Box>
      </Box>
      {isSearchOpen ? (
        <Search
          socket={socket}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />
      ) : null}
      {isNotificationOpen ? (
        <Notification
          socket={socket}
          isNotificationOpen={isNotificationOpen}
          setIsNotificationOpen={setIsNotificationOpen}
          setShowAlert={setShowAlert}
        />
      ) : null}
    </Fragment>
  );
};

export default Navbar;
