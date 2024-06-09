import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import LoaderHome from '../components/layout/LoaderHome';
import Chat from '../components/specific/Chat';
import { getSocket } from '../socket';

const Home = () => {
  const [flag, setFlag] = useState(false);
  useEffect(() => {

    return () => {};
  }, []);

  return (
    <Box sx={{ height: '90vh' }}>
      <Chat />
    </Box>
  );
};

export default Home;
