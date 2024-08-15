import { useCallback, useState } from "react";
import useRealtimeChat from "../websocket/useRealtimeChat";
import { Box, Button, TextField } from "@mui/material";
import { useAuthContext } from "../components/Auth/AuthProvider";

interface IMessage {
    sender: string;
    text: string;
}

function ChatPage() {
    const { socketRef } = useRealtimeChat();
    const { user } = useAuthContext();
    const [message, setMessage] = useState<IMessage[]>([]);
    const [text, setText] = useState("");

    const sendMsg = useCallback(() => {
        socketRef.current?.emit("chat message", {
            message: text,
        });
        setMessage((prevs) => [
            ...prevs,
            {
                sender: user?.id,
                text: text,
            } as IMessage,
        ]);
    }, [socketRef, text, user?.id]);

    return (
        <Box display="flex">
            {message.map((i) => (
                <Box>
                    Sender : {i.sender}, Text: {i.text}
                </Box>
            ))}
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                value={text}
                onChange={(e) => {
                    const textValue = e.target.value;
                    setText(textValue);
                }}
            />
            <Button onClick={sendMsg}>Send</Button>
        </Box>
    );
}
export default ChatPage;
