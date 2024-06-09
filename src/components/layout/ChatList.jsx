import { Avatar, Chip, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { palette, randomColourGenerator } from '../../themes/dark';
import { formatDate } from '../features/time';
import CircleIcon from '@mui/icons-material/Circle';
import { green } from '@mui/material/colors';

const ChatList = ({
  name,
  lastMessage,
  chatId,
  isOnline,
  isOpen,
  lastMessageTime,
  newMessageAlert,
}) => {
  return (
    <Paper
      elevation={isOpen ? 1 : 5}
      sx={{
        mx: 1,
        mt: 1,
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '5rem',
        bgcolor: false ? palette.primary.selected : palette.secondary.dark,
      }}
    >
      <Grid
        container
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid
          item
          xs={3}
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
          xs={6}
          sx={{}}
        >
          <Typography
            color={palette.primary.text}
            variant="subtitle1"
          >
            {name}
          </Typography>
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '50%', // Set your preferred maximum width
            }}
            color={palette.secondary.text}
            variant="subtitle2"
          >
            {lastMessage}
          </Typography>
        </Grid>
        {isOnline ? (
          <Grid
            item
            xs={1}
            sx={{display: 'flex', alignItems: 'center', justifyContent: "center"}}
          >
            <CircleIcon
              sx={{ color: palette.primary.success, fontSize: 20, mx: 1 }}
            />
          </Grid>
        ) : null}

        <Grid
          item
          xs={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            color={palette.secondary.text}
            variant="h7"
            sx={{ px: 1 }}
          >
            {lastMessageTime ? formatDate(lastMessageTime).formattedTime : null}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChatList;
