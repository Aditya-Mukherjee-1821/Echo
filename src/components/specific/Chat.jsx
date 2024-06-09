import { Grid, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
// import { chats } from "../constants/HardCodedData";
import ChatList from '../layout/ChatList';
import ChatNotOpen from '../layout/ChatNotOpen';
import Message from '../layout/Message';
import Notification from '../layout/Notification';
import Search from '../layout/Search';
import axios from 'axios';
import { server } from '../../constants/config';
import { palette } from '../../themes/dark';
import { getSocket } from '../../socket';
import {
  IS_ONLINE,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from '../../constants/events';

const Chat = () => {
  const socket = getSocket();
  const [isOpen, setIsOpen] = useState(false);
  const [chatId, setChatId] = useState('');
  const [name, setName] = useState('');
  const [members, setMembers] = useState([]);
  const [chats, setChats] = useState([]);
  const [alertId, setAlertId] = useState('');
  const [myUserId, setMyUserId] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);

  const handleClick = (chatId, name, members) => {
    setChatId(chatId);
    setMembers(members);
    setName(name);
    setIsOpen(true);
  };

  const fetchChats = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    try {
      const { data } = await axios.get(`${server}/user/me`, config);
      const { transformedChats } = data;
      // console.log(transformedChats);
      setChats(transformedChats[0]);
      setMyUserId(transformedChats[1]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChats();
    // socket.emit(IS_ONLINE, myUserId);
    socket.on(NEW_MESSAGE_ALERT, () => {
      fetchChats();
    });
    socket.on(REFETCH_CHATS, (data) => {
      fetchChats();
    });
    socket.on(IS_ONLINE, (onlineUsersIds) => {
      // console.log("CLGing from IS/-ONli", onlineUsersIds);
      setOnlineUsers(onlineUsersIds);
    });
    return () => {
      socket.off(NEW_MESSAGE_ALERT);
      socket.off(REFETCH_CHATS);
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid
          item
          sm={5}
          xs={isOpen ? 0 : 12}
          md={3}
          sx={{
            height: '92.3vh',
            overflow: 'auto',
            backgroundColor: palette.secondary.dark,
            display: { xs: isOpen ? 'none' : 'block', sm: 'block' },
          }}
        >
          {chats.length ? (
            <Stack>
              {chats &&
                chats.map((chat, index) => (
                  <Box
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      handleClick(
                        chat._id,
                        chat.otherMember[0].name,
                        chat.members
                      );
                    }}
                    key={index}
                  >
                    <ChatList
                      key={index}
                      name={chat.otherMember[0].name}
                      lastMessage={chat.lastMessage}
                      lastMessageTime={chat.lastMessageTime}
                      isOnline={onlineUsers.includes(
                        chat.otherMember[0]._id.toString()
                      )}
                      chatId={chat._id}
                      isOpen={chat._id === chatId}
                    />
                  </Box>
                ))}
            </Stack>
          ) : (
            <Box
              sx={{
                height: '92.3vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography color={palette.secondary.text}>
                Request to chat.
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid
          item
          sm={7}
          xs={isOpen ? 12 : 0}
          md={9}
          sx={{
            backgroundColor: palette.primary.dark,
            display: { xs: isOpen ? 'block' : 'none', sm: 'block' },
          }}
        >
          <Stack sx={{ mr: 0 }}>
            {isOpen ? (
              <Message
                name={name}
                chatId={chatId}
                members={members}
                setChatId={setChatId}
                setMembers={setMembers}
                setIsOpen={setIsOpen}
                socket={socket}
                myUserId={myUserId}
              />
            ) : (
              <ChatNotOpen />
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
