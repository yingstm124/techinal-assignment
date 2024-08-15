import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

function useRealtimeChat() {
    const socketRef = useRef<Socket>();
    // const { user } = useAuthContext();

    const onConversation = (obj: object) => {
        console.log(`receive ${obj}`);
    };

    useEffect(() => {
        // if(!user) return
        socketRef.current = io("http://localhost:5000");
        // socketRef.current.emit("setUsername", "alice");

        socketRef.current.on("conversation", onConversation);

        return () => {
            if (!socketRef?.current) return;
            socketRef.current.off("conversation");
        };
    }, []);

    return {
        socketRef,
    };
}
export default useRealtimeChat;
