import React from 'react';
import { TextField } from '@mui/material';
import { palette } from './dark';

const MyTextField = ({ label, type = 'text', fun, err, setErr, value }) => {
  return (
    <TextField
      value={value}
      label={label}
      variant="outlined"
      type={type}
      onChange={(e) => {
        fun(e.target.value);
        err ? setErr(false) : null;
      }}
      autoComplete="off" // Disable autofill and suggestions
      sx={{
        '& .MuiOutlinedInput-root': {
          '& input': {
            color: 'white', // Text color
          },
          '& fieldset': {
            borderColor: !err ? palette.primary.ok : palette.primary.error, // Default border color
          },
          '&:hover fieldset': {
            borderColor: !err ? palette.primary.ok : palette.primary.error, // Border color on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: !err ? palette.primary.ok : palette.primary.error, // Border color when focused
          },
          '&:-webkit-autofill': {
            WebkitBoxShadow: `0 0 0 100px ${
              !err ? palette.primary.ok : palette.primary.error
            } inset`, // Override autofill background color
          },
        },
        '& .MuiInputLabel-root': {
          color: !err ? palette.primary.ok : palette.primary.error, // Label color
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: !err ? palette.primary.ok : palette.primary.error, // Label color when focused
        },
        width: '100%',
        m: 2,
      }}
    />
  );
};

export default MyTextField;
