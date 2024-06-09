import {
  Box,
  Dialog,
  Stack,
  TextField,
  Typography,
  backdropClasses,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchList from './SearchList';
import axios from 'axios';
import { server } from '../../constants/config';
import CloseIcon from '@mui/icons-material/Close';
import { palette } from '../../themes/dark';
import MyTextField from '../../themes/filledInput';

const Search = ({ isSearchOpen, setIsSearchOpen, socket }) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const fetchList = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    try {
      const { data } = await axios.get(`${server}/user/search`, {
        params: {
          name: searchTerm,
        },
        ...config,
      });
      if (data.success) {
        setList(data.filteredUsers);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchList();

    return () => {};
  }, [searchTerm]);

  return (
    <Dialog
      open={isSearchOpen}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: palette.primary.dark, // Set the background color here
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: palette.primary.dark,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            p: 1,
            pb: 0,
            display: 'flex',
            flexDirection: 'row-reverse',
          }}
        >
          <CloseIcon
            onClick={() => setIsSearchOpen(false)}
            sx={{
              color: palette.primary.text,
              ':hover': {
                opacity: '0.8',
                cursor: 'pointer',
              },
              ':active': {
                opacity: '0.5',
              },
            }}
          />
        </Box>
        <Box
          sx={{
            mx: 2,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MyTextField
            label="Handle"
            mx={2}
            value={searchTerm}
            fun={setSearchTerm}
          />
        </Box>
      </Box>

      <Box
        sx={{
          height: '60vh',
          width: {xs: '80vw', sm: '60vw', md: '50vw', lg: '40vw', xl: '25vw'},
          overflow: 'auto',
          backgroundColor: palette.secondary.dark,
        }}
      >
        {list?.length ? (
          <Stack sx={{pb:1}}>
            {/* map all the users from list to Searchlist component */}
            {list &&
              list.map((user, index) => (
                <SearchList
                  key={index}
                  name={user.name}
                  user_id={user._id}
                  socket={socket}
                />
              ))}
          </Stack>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Typography
              color={palette.secondary.text}
              variant="h6"
            >
              No friends found.
            </Typography>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default Search;
