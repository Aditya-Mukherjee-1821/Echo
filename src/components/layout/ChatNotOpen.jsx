import { Box, Typography } from "@mui/material";
import React from "react";
import logo from "../../../public/logo2.svg";
import { palette } from "../../themes/dark";

const ChatNotOpen = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "92.3vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        backgroundColor: palette.primary.dark
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={logo} style={{ width: "20%" }} />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 0,
        }}
      >
        <Typography variant="caption" sx={{ color:palette.secondary.text }}>
          © 2024 Aditya Mukherjee
        </Typography>{" "}
      </Box>
    </Box>
  );
};

export default ChatNotOpen;
