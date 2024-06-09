import { Avatar, Button, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { server } from '../../constants/config';
import { palette, randomColourGenerator } from '../../themes/dark';
import { ACCEPTED, REFETCH_CHATS } from '../../constants/events';

const NotificationList = ({ request_id, name, socket }) => {
  const [status, setStatus] = useState('pending');
  const handleAcceptRequest = async (value) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    try {
      const { data } = await axios.put(
        `${server}/user/accept`,
        {
          req_id: request_id,
          accept: value,
        },
        config
      );
      value ? setStatus('accepted') : setStatus('rejected');
      if(value) socket.emit(ACCEPTED, data.members);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper
      elevation={5}
      sx={{ mx: 1, mt: 1, p: 2, backgroundColor: palette.secondary.dark }}
    >
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          item
          xs={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Avatar sx={{ bgcolor: randomColourGenerator(name.length) }}>
            {name[0]}
          </Avatar>
        </Grid>
        <Grid
          item
          xs={10}
          sx={{pl:1}}
        >
          <Typography
            color={palette.primary.text}
            variant="subtitle1"
          >
            {name}
            <Typography
              color={palette.secondary.text}
              variant="caption"
              sx={{
                ml:1
              }}
            >
              sent you a request
            </Typography>
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            mt: 1,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          {status === 'pending' ? (
            <Fragment>
              <Button
                value={true}
                sx={{ mx: 1 }}
                onClick={(e) => {
                  handleAcceptRequest(true);
                }}
              >
                Accept
              </Button>
              <Button
                value={false}
                sx={{ mx: 1 }}
                color="error"
                onClick={() => {
                  handleAcceptRequest(false);
                }}
              >
                Reject
              </Button>
            </Fragment>
          ) : (
            <Button
              sx={{ mx: 1 }}
              color={status === 'accepted' ? 'primary' : 'error'}
            >
              {status === 'accepted' ? 'Accepted' : 'Rejected'}
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NotificationList;
