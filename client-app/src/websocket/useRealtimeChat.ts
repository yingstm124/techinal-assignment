import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../components/Auth/AuthProvider";
import chatService from "../service/chat.service";
import { socket } from "./socket";
import { toast } from "react-toastify";

function useRealtimeChat(
  defaultRoomName?: string | undefined,
  senderName?: string | undefined,
  alertUserConnect: boolean = false
) {
  const { user } = useAuthContext();
  const [roomName, setRoomName] = useState(defaultRoomName);
  const [chatHistory, setChatHistory] = useState([]);
  const [signal, setSignal] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isSentMsg, setIsSentMsg] = useState(false)

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
    initChat();
  }, [initChat]);

  useEffect(() => {
    if (!user) return;
    if (!roomName) return;

    setIsConnected(true);
    socket.emit("join-room", {
      userName: user?.name ?? "",
      room: roomName,
    });
    socket.on("user-connected", onAlertUserConnect);
    socket.on("user-disconnected", onAlertUserDisconnect);
    socket.on("chat-message", onChat);
    socket.on("disconnect", (reason) => {
      setIsConnected(false);
      toast.info(reason);
      console.log("disconnect", reason);
    });
    socket.io.on("reconnect_attempt", () => {
      console.log("Attempting to reconnect...");
    });

    socket.io.on("reconnect", (attemptNumber) => {
      setIsConnected(true);
      toast.info("Reconnected successfully");
      console.log(`Reconnected successfully after ${attemptNumber} attempts`);
    });

    return () => {
      socket.emit("disconnect-room", {
        userName: user.userName,
        roomName: roomName,
      });
      socket.off("chat-message");
      socket.off("user-connected");
      socket.off("user-disconnected");
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
    chatHistory,
    signal,
    isConnected,
    isSentMsg,
  };
}
export default useRealtimeChat;
