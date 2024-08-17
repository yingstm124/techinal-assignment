import { useCallback, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "../components/Auth/AuthProvider";
import { IOnlineUsers } from "./param";

function useUserOnline() {
  const socketRef = useRef<Socket>();
  const { user, updateOnlineUsers } = useAuthContext();

  const offline = useCallback(() => {
    if (!socketRef.current) return;
    socketRef.current.emit("user-offline");
    socketRef.current.off("online-users");
  }, []);

  const onOnlineUsers = useCallback(
    (param: IOnlineUsers) => {
      updateOnlineUsers(param);
    },
    [updateOnlineUsers]
  );

  useEffect(() => {
    if (!user?.userName) return;
    socketRef.current = io("http://localhost:5000");
    socketRef.current.emit("user-online", user.userName);
    socketRef.current.on("online-users", onOnlineUsers);

    window.addEventListener("beforeunload", offline);

    return () => {
      window.removeEventListener("beforeunload", offline);
      offline();
    };
  }, [offline, onOnlineUsers, user?.userName]);
  return {};
}
export default useUserOnline;
