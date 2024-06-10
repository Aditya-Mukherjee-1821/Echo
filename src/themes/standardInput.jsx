import { TextField } from '@mui/material';
import React from 'react';
import { palette } from './dark';

const MyTextField2 = ({ multiline, maxRows, fullWidth, value, label, fun, handleTypingStatus }) => {
  return (
    <TextField
      multiline={multiline}
      maxRows={maxRows}
      fullWidth={fullWidth}
      value={value}
      onChange={(e) => {
        fun(e.target.value);
        handleTypingStatus();
      }}
      label={label}
      variant="standard"
      InputProps={{
        sx: {
          color: 'white', // Text color
          '&:before': {
            borderBottom: `2px solid ${palette.primary.ok}`, // Default underline color
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: `2px solid ${palette.primary.ok}`, // Underline color on hover
          },
          '&.Mui-focused:before': {
            borderBottom: `2px solid ${palette.primary.ok}`, // Underline color when focused
          },
          '&:after': {
            borderBottom: `2px solid ${palette.primary.ok}`, // After underline color
          },
        },
      }}
      InputLabelProps={{
        sx: {
          color: palette.primary.ok, // Label color
        },
        className: 'input-label',
      }}
      sx={{
        '& .MuiInputLabel-root.Mui-focused': {
          color: palette.primary.ok, // Label color when focused
        },
        '& .MuiInputLabel-root': {
          color: palette.primary.ok, // Label color
        },
      }}
    />
  );
};

export default MyTextField2;
