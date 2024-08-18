import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

function useRealtimeGroup() {
    const socketRef = useRef<Socket>();
    const [groups, setGroups] = useState([]);

    const onDeleteGroups = useCallback(
        (roomName: string) =>
            setGroups((prevs) => prevs.filter((i) => i.roomName !== roomName)),
        []
    );

    const onUpdateGroups = useCallback((param: any) => {
        setGroups(param);
    }, []);

    useEffect(() => {
        socketRef.current = io("http://localhost:5000");
        socketRef.current.emit("online-groups");
        socketRef.current.on("update-groups", onUpdateGroups);

        return () => {
            if (!socketRef?.current) return;
            socketRef.current.off("update-groups");
        };
    }, [onUpdateGroups]);

    return {
        socketRef,
        groups,
        onDeleteGroups,
    };
}
export default useRealtimeGroup;
