import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectRoutes from './components/auth/ProtectRoutes';
import Navbar from './components/shared/Navbar';
import { server } from './constants/config';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import Login from './pages/Login';
import { SocketProvider } from './socket';

const App = () => {
  const [user, setUser] = useState(false);
  //fetch token from backend
  const fetchToken = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    try {
      const { data } = await axios.get(`${server}/user/token`, config);
      setUser(data.success);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectRoutes
              user={!user}
              redirect="/"
            >
              <Login
                setUser={setUser}
                user={user}
              />
            </ProtectRoutes>
          }
        />
        <Route
          path="/"
          element={
            <SocketProvider>
              <ProtectRoutes user={user}>
                <Navbar
                  user={user}
                  setUser={setUser}
                />
                <Home />
              </ProtectRoutes>
            </SocketProvider>
          }
        />
        <Route
          path="*"
          element={<Error404 />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
