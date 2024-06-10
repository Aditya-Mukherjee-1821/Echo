import { Box, Grid } from '@mui/material';
import React from 'react';
import { palette } from '../themes/dark';

const LoaderPage = () => {
  return <Box flexGrow={1}>
    <Grid container>
        <Grid item xs={12} sx={{height: '100vh', backgroundColor: palette.primary.dark}}>

        </Grid>
    </Grid>
  </Box>;
};

export default LoaderPage;
