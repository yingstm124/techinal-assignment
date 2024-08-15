import {
    Avatar,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router";

interface IFriend {
    name: string;
    userId: string;
}

function Friend({ name, userId }: IFriend) {
    const navigate = useNavigate();
    const onChat = useCallback(() => {
        navigate(`/chat/${userId}`);
    }, [navigate, userId]);
    return (
        <>
            <ListItemButton onClick={onChat}>
                <ListItemAvatar>
                    <Avatar />
                </ListItemAvatar>
                <ListItemText primary={name} />
            </ListItemButton>
            <Divider />
        </>
    );
}
export default Friend;
