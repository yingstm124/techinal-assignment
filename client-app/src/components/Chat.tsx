import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useAuthContext } from "./Auth/AuthProvider";
import { SIDEBAR_WIDTH } from "./SideBar";
import useDevice from "../hooks/useDevice";
import SendIcon from "@mui/icons-material/Send";
import insertSpaceLongText from "../helper/insertSpaceLongText";

const Chat = forwardRef(
  (
    { chatHistory, signal }: { chatHistory: never[]; signal?: string },
    socketRef: any
  ) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const { isMobileTablet } = useDevice();
    const { user } = useAuthContext();
    const [text, setText] = useState("");

    const sendMsg = useCallback(() => {
      if (text === "") return;
      setText("");
      socketRef.current?.emit(
        "chat-message",
        {
          userName: user?.userName ?? "",
          message: text,
        },
        (res) => {
          console.log(res);
        }
      );
      if (!bottomRef?.current) return;
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [socketRef, text, user?.userName]);

    const onKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") sendMsg();
      },
      [sendMsg]
    );

    useEffect(() => {
      if (chatHistory.length > 0)
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory.length]);

    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        {chatHistory && (
          <Box
            width="100%"
            height={"calc(100vh - 180px)"}
            sx={{
              overflow: "auto",
            }}
            paddingX={2}
          >
            {chatHistory.map((i, index: number) => (
              <Box key={index} flexDirection="column" marginBottom={3}>
                <Box
                  display="flex"
                  justifyContent={
                    i.userName === user?.userName ? "flex-end" : "flex-start"
                  }
                  alignItems="center"
                >
                  {i.userName !== user?.userName && <Avatar />}
                  <Box maxWidth={300}>
                    <Typography variant="subtitle1" padding={2} overflow="bre">
                      {insertSpaceLongText(i.content, 33)}
                    </Typography>
                  </Box>
                  {i.userName === user?.userName && <Avatar />}
                </Box>
                {
                  <Box
                    display="flex"
                    justifyContent={
                      i.userName === user?.userName ? "flex-end" : "flex-start"
                    }
                  >
                    {new Date(i.timeStamp * 1000).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </Box>
                }
                <Box
                  display="flex"
                  justifyContent={
                    i.userName === user?.userName ? "flex-end" : "flex-start"
                  }
                >
                  {i.status}
                </Box>
              </Box>
            ))}
            <div ref={bottomRef} />
          </Box>
        )}

        {signal && (
          <Box
            flexDirection="column"
            position="absolute"
            bottom={90}
            sx={{ transition: "opacity 6s ease-in-out" }}
          >
            <Typography variant="subtitle1">{signal}</Typography>
          </Box>
        )}

        <Box
          display="flex"
          position="absolute"
          bottom={20}
          width={
            isMobileTablet ? "100%" : `calc(100% - ${SIDEBAR_WIDTH}px - 80px)`
          }
        >
          <TextField
            label=""
            variant="outlined"
            fullWidth
            value={text}
            onChange={(e) => {
              const textValue = e.target.value;
              setText(textValue);
            }}
            sx={{
              border: "primary.main",
              bgcolor: "background.paper",
            }}
            onKeyDown={onKeyDown}
          />
          <Button
            sx={{ position: "absolute", right: 0, top: 9 }}
            onClick={sendMsg}
          >
            <SendIcon />
          </Button>
        </Box>
      </Box>
    );
  }
);

export default Chat;
