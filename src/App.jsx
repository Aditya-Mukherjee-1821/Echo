import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectRoutes from './components/auth/ProtectRoutes';
import Navbar from './components/shared/Navbar';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import Login from './pages/Login';
import { useCookies } from 'react-cookie';
import { SocketProvider } from './socket';

const App = () => {
  const [cookie, setCookie, removeCookie] = useCookies([]);
  const [user, setUser] = useState(cookie['EchoToken'] ? true : false);

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
