import {
    Avatar,
    Badge,
    Divider,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router";

interface IFriend {
    name: string;
    userId: string;
    isOnline: boolean;
}

function OnlineAvatar() {
    return (
        <Badge variant="dot" badgeContent={""} color="primary">
            <Avatar />
        </Badge>
    );
}

function Friend({ name, userId, isOnline }: IFriend) {
    const navigate = useNavigate();
    const onChat = useCallback(() => {
        navigate(`/chat/${userId}`);
    }, [navigate, userId]);
    return (
        <>
            <ListItemButton onClick={onChat}>
                <ListItemAvatar>
                    {isOnline ? <OnlineAvatar /> : <Avatar />}
                </ListItemAvatar>
                <ListItemText primary={name} />
            </ListItemButton>
            <Divider />
        </>
    );
}
export default Friend;
