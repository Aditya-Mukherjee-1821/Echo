import { Button, Divider, Paper, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import logo from '../../public/logo2.svg';
import { server } from '../constants/config';
import { palette } from '../themes/dark';
import MyTextField from '../themes/filledInput.jsx';

const Login = ({ setUser, user }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const toggleLogin = () => {
    setIsLogin((prev) => !prev);
    setName('');
    setHandle('');
    setPassword('');
    setError(false);
  };

  function isValidHandle(handle) {
    // Regular expression to match only lowercase letters and underscores
    const regex = /^[a-z_]+$/;

    // Test the handle against the regex
    return regex.test(handle);
  }

  const handleSignup = async (e) => {
    if(!isValidHandle(handle)){
      setError(true);
      setErrMessage("Only lowercase letters and underscores are allowed");
      return;
    }
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    try {
      const { data } = await axios.post(
        `${server}/user/signup`,
        {
          handle: handle,
          password: password,
          name: name,
        },
        config
      );

      console.log(data);
      setUser(true);
    } catch (err) {
      setError(true);
      setErrMessage('Handle already exists');
      // console.log(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Important to include credentials in request
    };

    try {
      const res = await axios.post(
        `${server}/user/login`,
        {
          handle: handle,
          password: password,
        },
        config
      );
      console.log(res);
      setUser(true);
    } catch (err) {
      // console.error('Login error:', err.response.data);
      setError(!err.response.data.success);
      setErrMessage('Invalid credentials');
    }
  };
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: palette.primary.dark,
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: palette.primary.dark,
        }}
      >
        <Paper
          elevation={5}
          sx={{
            width: '100%',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: palette.secondary.dark,
          }}
        >
          {isLogin ? (
            <>
              <img
                src={logo}
                style={{ width: '50%' }}
              />

              <MyTextField
                label="Handle"
                value={handle}
                err={error}
                setErr={setError}
                fun={setHandle}
              />
              {error ? (
                <Typography
                  sx={{ width: '100%' }}
                  color={palette.primary.error}
                  variant="caption"
                >{`*${errMessage}`}</Typography>
              ) : null}
              <MyTextField
                label="Password"
                type="password"
                value={password}
                err={error}
                setErr={setError}
                fun={setPassword}
              />
              {error ? (
                <Typography
                  sx={{ width: '100%' }}
                  color={palette.primary.error}
                  variant="caption"
                >{`*${errMessage}`}</Typography>
              ) : null}
              <Button
                variant="outlined"
                sx={{
                  width: '100%',
                  m: 2,
                  p: 2,
                }}
                onClick={(e) => {
                  handleLogin(e);
                }}
              >
                Log in
              </Button>
              <Divider
                variant="middle"
                color="#DADDE1"
                sx={{ width: '100%' }}
              />
              <Button
                onClick={() => {
                  toggleLogin();
                }}
                variant="contained"
                color="success"
                sx={{
                  width: '100%',
                  m: 2,
                  p: 2,
                }}
              >
                Sign up
              </Button>
            </>
          ) : (
            <>
              <img
                src={logo}
                style={{ width: '50%' }}
              />

              <MyTextField
                label="Name"
                value={name}
                fun={setName}
              />
              <MyTextField
                label="Handle"
                value={handle}
                err={error}
                setErr={setError}
                fun={setHandle}
              />
              {error ? (
                <Typography
                  sx={{ width: '100%' }}
                  color={palette.primary.error}
                  variant="caption"
                >{`*${errMessage}`}</Typography>
              ) : null}
              <MyTextField
                label="Password"
                type="password"
                value={password}
                fun={setPassword}
              />
              <Button
                variant="contained"
                color="success"
                sx={{
                  width: '100%',
                  m: 2,
                  p: 2,
                }}
                onClick={(e) => {
                  handleSignup(e);
                }}
              >
                Sign up
              </Button>
              <Divider
                variant="middle"
                color="#DADDE1"
                sx={{ width: '100%' }}
              />
              <Button
                onClick={() => {
                  toggleLogin();
                }}
                variant="outlined"
                sx={{
                  width: '100%',
                  m: 2,
                  p: 2,
                }}
              >
                Log in
              </Button>
            </>
          )}
          <Typography
            variant="caption"
            sx={{ color: '#7f8182' }}
          >
            © 2024 Aditya Mukherjee
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
