import { Box, Skeleton } from '@mui/material';
import React from 'react';
import { palette } from '../../themes/dark';

const ChatLoader = () => {
  return (
    <Box sx={{ height: '92.3vh', width: '100%', p: 1 }}>
      <Skeleton
        variant="rounded"
        sx={{width: '100%', height: '100%', bgcolor: palette.primary.selected}}
      />
    </Box>
  );
};

export default ChatLoader;
