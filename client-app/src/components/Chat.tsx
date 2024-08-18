import { Box, Button, TextField } from "@mui/material";
import { forwardRef, useCallback, useState } from "react";
import { useAuthContext } from "./Auth/AuthProvider";

const Chat = forwardRef(
    ({ chatHistory }: { chatHistory: never[] }, socketRef: any) => {
        const { user } = useAuthContext();
        const [text, setText] = useState("");
        const sendMsg = useCallback(() => {
            setText("");
            socketRef.current?.emit("chat-message", {
                userName: user?.name ?? "",
                message: text,
            });
        }, [socketRef, text, user?.name]);

        return (
            <Box display="flex" justifyContent="center" alignItems="center">
                {chatHistory && (
                    <Box>
                        {chatHistory.map((i, index: number) => (
                            <Box key={index}>
                                {i.userName} : {i.content}
                            </Box>
                        ))}
                    </Box>
                )}
                <Box display="flex" position="absolute" bottom={20}>
                    <TextField
                        label=""
                        variant="outlined"
                        fullWidth
                        value={text}
                        onChange={(e) => {
                            const textValue = e.target.value;
                            setText(textValue);
                        }}
                    />
                    <Button onClick={sendMsg}>Send</Button>
                </Box>
            </Box>
        );
    }
);

export default Chat;
