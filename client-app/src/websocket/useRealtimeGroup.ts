import { useCallback, useEffect, useState } from "react";
import { socket } from "./socket";

function useRealtimeGroup() {
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
        socket.emit("online-groups");
        socket.on("update-groups", onUpdateGroups);

        return () => {
            socket.off("update-groups");
        };
    }, [onUpdateGroups]);

    return {
        groups,
        onDeleteGroups,
    };
}
export default useRealtimeGroup;
