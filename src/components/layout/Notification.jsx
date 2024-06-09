import {
  Box,
  Dialog,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchList from './SearchList';
import NotificationList from './NotificationList';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { server } from '../../constants/config';
import { palette } from '../../themes/dark';

const Notification = ({
  isNotificationOpen,
  setIsNotificationOpen,
  socket,
  setShowAlert,
}) => {
  const theme = useTheme();
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    try {
      const { data } = await axios.get(`${server}/user/notifications`, config);
      setList(data.request);
      console.log(list);
      if (list.length > 0) setShowAlert(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchList();

    return () => {};
  }, []);

  return (
    <Dialog
      open={isNotificationOpen}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: palette.primary.dark, // Set the background color here
        },
      }}
    >
      <Box
        sx={{
          p: 1,
          display: 'flex',
          flexDirection: 'row-reverse',
          backgroundColor: palette.primary.dark,
        }}
      >
        <CloseIcon
          onClick={() => {
            setIsNotificationOpen(false);
          }}
          sx={{
            ':hover': {
              opacity: '0.8',
              cursor: 'pointer',
            },
            ':active': {
              opacity: '0.5',
            },
            color: palette.primary.text,
          }}
        />
      </Box>
      <Box
        sx={{
          height: '72vh',
          width: { xs: '80vw', sm: '60vw', md: '50vw', lg: '40vw', xl: '25vw' },
          overflow: 'auto',
          backgroundColor: palette.secondary.dark,
        }}
      >
        {list?.length ? (
          <Stack sx={{ pb: 1 }}>
            {/* map the list state to NotificationList component */}
            {list &&
              list.map((notification, index) => {
                return (
                  <NotificationList
                    key={index}
                    request_id={notification._id}
                    name={notification.sender.name}
                    socket={socket}
                  />
                );
              })}
          </Stack>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Typography
              color={palette.secondary.text}
              variant="h6"
            >
              No requests found.
            </Typography>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default Notification;
