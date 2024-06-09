import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { Box, Fab, Grid, Paper, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { server } from '../../constants/config';
import { palette } from '../../themes/dark';
import MyTextField2 from '../../themes/standardInput';
import TextBubble from './TextBubble';
import { CHAT_OPENED, IS_ONLINE, NEW_MESSAGE } from '../../constants/events';
import CircleIcon from '@mui/icons-material/Circle';
import ScrollToBottom from 'react-scroll-to-bottom';

const Message = ({
  chatId,
  name,
  setIsOpen,
  setChatId,
  socket,
  members,
  setMembers,
  myUserId,
}) => {
  const [messages, setMessages] = useState();
  const [inputMessage, setInputMessage] = useState('');
  const [user, setUser] = useState('');
  const [page, setPage] = useState(1);

  const scrollToBottomRef = useRef(null);
  const infiniteScrollRef = useRef(null);

  // const [isTyping, setIsTyping] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
    setChatId('');
    setMembers([]);
  };
  // console.log(page);
  // console.log(messages);
  const fetchMessages = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    try {
      const { data } = await axios.get(
        `${server}/user/messages/${chatId}`,
        config
      );
      //add the top messages to messages
      setMessages(data.messages);

      setUser(data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    socket.emit(NEW_MESSAGE, {
      chat_id: chatId,
      members: members,
      content: inputMessage,
    });
    setInputMessage('');
  };

  useEffect(() => {
    fetchMessages();
    socket.on(NEW_MESSAGE, (data) => {
      setMessages((prevMessages) => [data, ...prevMessages]);
    });
    
    return () => {
      socket.off(NEW_MESSAGE);
    };
  }, [chatId]);

  // useEffect(() => {
  //   if (scrollToBottomRef.current) {
  //     scrollToBottomRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }

  //   return () => {};
  // }, [messages]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (infiniteScrollRef.current) {
  //       // Check if the scrollbar is at or near the top
  //       if (infiniteScrollRef.current.scrollTop === 0) {
  //         console.log('Scrolled to the top');
  //         setPage((prev) => prev + 1);
  //         // setPage((prev) => prev + 1); // Assuming you want to increment the page
  //       }
  //     }
  //   };

  //   const divElement = infiniteScrollRef.current;
  //   divElement.addEventListener('scroll', handleScroll);
  //   console.log('Event listener added');

  //   return () => {
  //     divElement.removeEventListener('scroll', handleScroll);
  //     console.log('Event listener removed');
  //   };
  // }, []);

  // useEffect(() => {
  //   fetchMessages(page);

  //   return () => {};
  // }, [page]);

  return (
    <Paper
      elevation={5}
      sx={{
        height: '90.3vh',
        position: 'relative',
        m: '1vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          p: 2,
          color: palette.primary.text,
          backgroundColor: palette.primary.selected,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        borderRadius={0.5}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <Typography variant="h6">{name}</Typography>
          {/* {isTyping?<Typography variant="caption" color={palette.secondary.text}>typing...</Typography>:null} */}
        </Box>
        <CloseIcon
          onClick={handleClose}
          sx={{
            ':hover': { opacity: 0.7 },
            ':active': { opacity: 0.5 },
            cursor: 'pointer',
          }}
        />
      </Box>
      <Box
        // ref={infiniteScrollRef}
        sx={{
          overflow: 'auto',
          pl: 3,
          pr: 3,
          pt: 1,
          pb: 1,
          // height: '72vh',
          flexGrow: 1,
          backgroundColor: palette.secondary.dark,
        }}
      >
        {/* map the messages */}

        {messages &&
          messages.map((message, index) => (
            <TextBubble
              key={index}
              content={message.content}
              side={message.sender._id === user ? 'receiver' : 'sender'}
              time={message.createdAt}
            />
          ))}
        {/* <div ref={scrollToBottomRef}></div> */}
      </Box>
      <Box sx={{ width: '100%' }}>
        <Grid
          container
          sx={{ pb: 1, pt: 1, backgroundColor: palette.secondary.dark }}
        >
          <Grid
            item
            md={11}
            xs={10}
            sx={{
              p: 1,
              pt: 0,
            }}
          >
            <MyTextField2
              label="Message"
              multiline={true}
              maxRows={1}
              fullWidth={true}
              value={inputMessage}
              fun={setInputMessage}
            />
          </Grid>
          <Grid
            item
            md={1}
            xs={2}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Fab
              size="medium"
              color="primary"
              aria-label="add"
              onClick={(e) => {
                handleSend(e);
              }}
            >
              <Tooltip title="Send">
                <SendIcon />
              </Tooltip>
            </Fab>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Message;
