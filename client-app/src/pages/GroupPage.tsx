import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import groupService from "../service/group.service";
import { useAuthContext } from "../components/Auth/AuthProvider";
import useRealtimeGroup from "../websocket/useRealtimeGroup";
import { useNavigate } from "react-router";
import { socket } from "../websocket/socket";

function GroupPage() {
    const [openNewGroupPopup, setOpenNewGroupPopup] = useState(false);
    const [roomName, setRoomName] = useState("");
    const { user } = useAuthContext();
    const { groups, onDeleteGroups } = useRealtimeGroup();
    const navigate = useNavigate();

    const emitGetUpdatedGroup = useCallback(() => {
        socket.emit("online-groups");
    }, []);

    const isOwnGroup = useCallback(
        (createdBy: string) => createdBy === (user?.userName ?? ""),
        [user?.userName]
    );

    const createGroup = useCallback(
        async (roomName: string) => {
            await groupService.createGroup(roomName, user?.userName ?? "");
            emitGetUpdatedGroup();
        },
        [emitGetUpdatedGroup, user?.userName]
    );

    const deleteGroup = useCallback(
        async (roomName: string) => {
            await groupService.deleteGroup(roomName, user?.userName ?? "");
            emitGetUpdatedGroup();
            onDeleteGroups(roomName);
        },
        [emitGetUpdatedGroup, onDeleteGroups, user?.userName]
    );

    const onChangeRoomName = (val: string) => {
        setRoomName(val);
    };

    const onSubmitCreateRoom = useCallback(() => {
        if (!roomName) return;
        createGroup(roomName);
        setOpenNewGroupPopup(false);
        setRoomName("");
    }, [createGroup, roomName]);

    const joinRoom = useCallback(
        (roomName: string) => {
            navigate(`/groups/${roomName}`);
        },
        [navigate]
    );

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box>
                <Button
                    variant="contained"
                    onClick={() => setOpenNewGroupPopup(true)}
                    sx={{ minWidth: 150 }}
                >
                    New Group
                </Button>
            </Box>
            <Box display="flex" margin={2}>
                {groups.length > 0 ? (
                    groups.map((i, index: number) => (
                        <Box key={index} width={300} margin={2}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6">
                                        {i.roomName}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        align="center"
                                    >
                                        Created By : {i.createdBy}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Box
                                        display="flex"
                                        justifyContent={
                                            isOwnGroup(i.createdBy)
                                                ? "space-between"
                                                : "flex-end"
                                        }
                                        width="100%"
                                    >
                                        {isOwnGroup(i.createdBy) && (
                                            <Button
                                                onClick={() =>
                                                    deleteGroup(i.roomName)
                                                }
                                            >
                                                Del
                                            </Button>
                                        )}
                                        <Button
                                            onClick={() => {
                                                joinRoom(i.roomName);
                                            }}
                                        >
                                            Join room
                                        </Button>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Box>
                    ))
                ) : (
                    <Box margin={2}>-- No group --</Box>
                )}
            </Box>

            {openNewGroupPopup && (
                <Dialog open>
                    <DialogContent>
                        Group name :{" "}
                        <input
                            value={roomName}
                            onChange={(e) => {
                                onChangeRoomName(e.target.value);
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                setOpenNewGroupPopup(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button onClick={() => onSubmitCreateRoom()}>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
}
export default GroupPage;
