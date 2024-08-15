import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { IChatParam } from "./param";
import { useAuthContext } from "../components/Auth/AuthProvider";

function useRealtimeChat() {
    const socketRef = useRef<Socket>();
    const { user } = useAuthContext();

    const onChat = (param: IChatParam) => {
        console.log(`receive ${param.message}`);
    };

    // get chistory from socket
    useEffect(() => {
        // if(!user) return
        socketRef.current = io("http://localhost:5000");
        socketRef.current.emit("start chat", user?.id ?? "");
        socketRef.current.on("chat message", onChat);

        return () => {
            if (!socketRef?.current) return;
            socketRef.current.off("chat message");
        };
    }, [user?.id]);

    return {
        socketRef,
    };
}
export default useRealtimeChat;
