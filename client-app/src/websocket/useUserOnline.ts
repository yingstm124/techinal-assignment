import { useCallback, useEffect } from "react";
import { useAuthContext } from "../components/Auth/AuthProvider";
import { IOnlineUsers } from "./param";
import { socket } from "./socket";

function useUserOnline() {
  const { user, updateOnlineUsers } = useAuthContext();

  const onOnlineUsers = useCallback(
    (param: IOnlineUsers) => {
      updateOnlineUsers(param);
    },
    [updateOnlineUsers]
  );

  useEffect(() => {
    if (!user?.userName) return;
    socket.emit("user-online", user.userName);
    socket.on("online-users", onOnlineUsers);

    return () => {
      if (!socket) return;
      socket.off("online-users");
    };
  }, [onOnlineUsers, user?.userName]);
  return {};
}
export default useUserOnline;
