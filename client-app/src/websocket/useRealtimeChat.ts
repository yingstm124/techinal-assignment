import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "../components/Auth/AuthProvider";
import chatService from "../service/chat.service";
import { useParams } from "react-router";

function useRealtimeChat() {
  const socketRef = useRef<Socket>();
  const { user } = useAuthContext();
  const [roomName, setRoomName] = useState();
  const [chatHistory, setChatHistory] = useState();
  const { id: senderName } = useParams();

  const initChat = useCallback(async (userName: string, senderName: string) => {
    const resRoom = await chatService.initRoom(userName, senderName);
    const roomName = resRoom.data as string;
    setRoomName(roomName);
    const resChatHistory = await chatService.chatHistory(roomName);
    setChatHistory(resChatHistory.data);
  }, []);

  const onChat = useCallback((message: any) => {
    setChatHistory((prevs) => [...prevs, message]);
  }, []);

  useEffect(() => {
    if (isGroupChat) return;
    if (!user?.userName || !senderName) return;
    initChat(user.userName, senderName);
  }, [initChat, senderName, user?.userName, isGroupChat]);

  useEffect(() => {
    // if(!user) return
    if (!roomName) return;
    socketRef.current = io("http://localhost:5000");
    socketRef.current.emit("join-room", {
      userName: user?.name ?? "",
      room: roomName,
    });
    socketRef.current.on("user-connected", () => {});
    socketRef.current.on("chat-message", onChat);

    return () => {
      if (!socketRef?.current) return;

      socketRef.current.emit("disconnected", {
        userName: user?.name ?? "",
      });
      socketRef.current.off("join-room");
      socketRef.current.off("chat-message");
    };
  }, [onChat, roomName, user?.name, user?.userName]);

  return {
    socketRef,
    chatHistory,
  };
}
export default useRealtimeChat;
