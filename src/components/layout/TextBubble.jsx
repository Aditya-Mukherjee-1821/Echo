import { Box, Typography } from '@mui/material';
import React from 'react';
import { palette } from '../../themes/dark';
import { formatDate } from '../features/time';

const TextBubble = ({ side, content, time }) => {
  return (
    <Box
      sx={{
        width: '100%',
        mt: 2,
        display: 'flex',
        flexDirection: side == 'sender' ? 'row' : 'row-reverse',
      }}
    >
      <Box
        sx={{
          maxWidth: '70%',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
          p: 2,
          pb: 0.2,
          borderRadius: 1,
          borderTopRightRadius: side == 'sender' ? 5 : 0,
          borderTopLeftRadius: side == 'receiver' ? 5 : 0,
          backgroundColor:
            side == 'sender'
              ? palette.primary.sender
              : palette.primary.receiver,
          position: 'relative',
          color: 'white',
        }}
      >
        {side == 'sender' ? (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: '-2%',
              width: '5%',
              height: ' 10%',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `linear-gradient(to bottom left, ${palette.primary.sender} 50%, transparent 50%)`,
              }}
            ></div>
          </Box>
        ) : (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: '-2%',
              width: '5%',
              height: ' 10%',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `linear-gradient(to bottom right, ${palette.primary.receiver} 50%, transparent 50%)`,
              }}
            ></div>
          </Box>
        )}
        {content}
        <Box sx={{ m: 0 }}>
          <Typography
            sx={{ mr: 0.5 }}
            variant="caption"
            color={palette.primary.time}
          >
            {formatDate(time).formattedDate}
          </Typography>
          <Typography
            sx={{ ml: 0.5 }}
            variant="caption"
            color={palette.primary.time}
          >
            {formatDate(time).formattedTime}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TextBubble;
