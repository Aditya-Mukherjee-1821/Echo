import { Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import logo from '../../public/logo2.svg';
import { palette } from '../themes/dark';

const Error404 = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: palette.primary.dark,
      }}
    >
      <Container
        maxsize="xs"
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src={logo}
          style={{ width: '50%', m: 2, mt:4 }}
        />
        <Typography
          variant="h1"
          sx={{ m: 2, color: palette.secondary.text }}
        >
          Oops!
        </Typography>
        <Typography
          variant="h6"
          sx={{ m: 2, color: palette.primary.text }}
        >
          Page not found.
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: palette.secondary.text, position: 'absolute', bottom: 1 }}
        >
          © 2024 Aditya Mukherjee
        </Typography>
      </Container>
    </div>
  );
};

export default Error404;
