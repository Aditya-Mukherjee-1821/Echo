import { Avatar, Button, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { server } from '../../constants/config';
import axios from 'axios';
import { palette, randomColourGenerator } from '../../themes/dark';
import { NEW_REQUEST } from '../../constants/events';

const SearchList = ({ user_id, name, socket }) => {
  const [buttonText, setButtonText] = useState('Echo');

  const handleSendRequest = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    try {
      const { data } = await axios.put(
        `${server}/user/request`,
        {
          reqUser_id: user_id,
        },
        config
      );
      if (data.success) {
        // console.log('successfully sent request');
        setButtonText('Sent');
        socket.emit(NEW_REQUEST, user_id);
      }
      if (data.message === 'Request already sent') setButtonText('Sent');
      // console.log([...transformedChats]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper
      elevation={5}
      sx={{ mx: 1, p: 2, mt: 1, backgroundColor: palette.secondary.dark }}
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
          xs={8}
          sx={{ pl: 1 }}
        >
          <Typography
            color={palette.primary.text}
            variant="h7"
          >
            {name}
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
          }}
        >
          <Button
            onClick={() => handleSendRequest()}
            color="success"
            sx={{ mr: 0 }}
          >
            {buttonText}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SearchList;
