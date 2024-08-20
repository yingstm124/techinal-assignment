import { useCallback, useEffect, useRef, useState } from "react";
import { io, Manager, Socket } from "socket.io-client";
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
  const [signal, setSignal] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const onAlertUserConnect = useCallback(
    (param: any) => {
      if (!alertUserConnect) return;
      setSignal(param.message);
    },
    [alertUserConnect]
  );

  const onAlertUserDisconnect = useCallback(
    (param: any) => {
      if (!alertUserConnect) return;
      setSignal(param.message);
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
      const resRoom = await chatService.initRoom(user.userName, senderName);
      setRoomName(resRoom.data as string);
      await initChatHistory(resRoom.data as string);
    } else if (roomName) {
      await initChatHistory(roomName);
    }
  }, [initChatHistory, roomName, senderName, user?.userName]);

  const onChat = useCallback((payload: any) => {
    const newMessage = payload;
    if (payload.status === "ok") newMessage.status = "sent";
    else newMessage.status = "unsent";
    setChatHistory((prevs) => [...prevs, payload]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSignal("");
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    initChat();
  }, [initChat]);

  console.log("isConnected");

  useEffect(() => {
    if (!user) return;
    if (!roomName) return;

    const manager = new Manager("http://localhost:5000");
    socketRef.current = manager.socket("/");
    setIsConnected(true);
    socketRef.current.emit("join-room", {
      userName: user?.name ?? "",
      room: roomName,
    });
    socketRef.current.on("user-connected", onAlertUserConnect);
    socketRef.current.on("user-disconnected", onAlertUserDisconnect);
    socketRef.current.on("chat-message", onChat);
    socketRef.current.on("disconnect", (reason) => {
      setIsConnected(false);
      console.log("disconnect", reason);
    });
    socketRef.current.io.on("reconnect_attempt", () => {
      setReconnectAttempts((prev) => prev + 1);
      console.log("Attempting to reconnect...");
    });

    socketRef.current.io.on("reconnect", (attemptNumber) => {
      setReconnectAttempts(0);
      setIsConnected(true);
      console.log(`Reconnected successfully after ${attemptNumber} attempts`);
    });

    return () => {
      if (!socketRef?.current) return;

      socketRef.current.emit("disconnect-room", {
        userName: user.userName,
        roomName: roomName,
      });
      socketRef.current.off("chat-message");
      socketRef.current.off("user-connected");
      socketRef.current.off("user-disconnected");
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
    onAlertUserDisconnect,
  ]);

  return {
    socketRef,
    chatHistory,
    signal,
    isConnected,
  };
}
export default useRealtimeChat;
