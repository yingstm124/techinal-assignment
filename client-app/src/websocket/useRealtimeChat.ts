import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "../components/Auth/AuthProvider";
import chatService from "../service/chat.service";
import { toast } from "react-toastify";

function useRealtimeChat(
    defaultRoomName?: string | undefined,
    senderName?: string | undefined,
    alertUserConnect: boolean = false
) {
    const socketRef = useRef<Socket>();
    const { user } = useAuthContext();
    const [roomName, setRoomName] = useState(defaultRoomName);
    const [chatHistory, setChatHistory] = useState([]);

    const onAlertUserConnect = useCallback(
        (param: any) => {
            if (!alertUserConnect) return;
            toast(param.message);
        },
        [alertUserConnect]
    );

    const initChatHistory = useCallback(async (roomName: string) => {
        const resChatHistory = await chatService.chatHistory(roomName);
        setRoomName(roomName);
        setChatHistory(resChatHistory.data as never[]);
    }, []);

    const initChat = useCallback(async () => {
        if (!user?.userName) return;
        if (!roomName && senderName) {
            const resRoom = await chatService.initRoom(
                user.userName,
                senderName
            );
            setRoomName(resRoom.data as string);
            await initChatHistory(resRoom.data as string);
        } else if (roomName) {
            await initChatHistory(roomName);
        }
    }, [initChatHistory, roomName, senderName, user?.userName]);

    const onChat = useCallback((message: any) => {
        setChatHistory((prevs) => [...prevs, message]);
    }, []);

    useEffect(() => {
        initChat();
    }, [initChat]);

    useEffect(() => {
        if (!user) return;
        if (!roomName) return;

        socketRef.current = io("http://localhost:5000");
        socketRef.current.emit("join-room", {
            userName: user?.name ?? "",
            room: roomName,
        });
        socketRef.current.on("user-connected", onAlertUserConnect);
        socketRef.current.on("chat-message", onChat);

        return () => {
            if (!socketRef?.current) return;

            socketRef.current.emit("disconnected", {
                userName: user?.name ?? "",
            });
            socketRef.current.off("chat-message");
            socketRef.current.off("user-connected");
        };
    }, [
        initChat,
        onAlertUserConnect,
        onChat,
        roomName,
        senderName,
        user,
        user?.name,
        user?.userName,
    ]);

    return {
        socketRef,
        chatHistory,
    };
}
export default useRealtimeChat;
