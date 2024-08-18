import {
    Avatar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import { useAuthContext } from "./Auth/AuthProvider";
import { useState } from "react";
import { useNavigate } from "react-router";
import LogoutIcon from "@mui/icons-material/Logout";

function Profile() {
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);
    const onLogout = () => {
        navigate("/");
        logout();
    };
    return (
        <Box
            display="flex"
            width="100%"
            justifyContent="center"
            alignItems="center"
            paddingY={1}
        >
            <IconButton
                aria-controls={open ? "profile-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                size="small"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    setOpen(true);
                    setAnchorEl(e.currentTarget);
                }}
            >
                <Typography variant="subtitle1" paddingX={1}>
                    {user?.name.toUpperCase()}
                </Typography>
                <Avatar />
            </IconButton>

            {open && (
                <Menu
                    id="profile-menu"
                    anchorEl={anchorEl}
                    open
                    onClose={() => setOpen(false)}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    <MenuItem>
                        <Button
                            startIcon={<LogoutIcon />}
                            onClick={onLogout}
                            sx={{ color: "text.primary" }}
                        >
                            Logout
                        </Button>
                    </MenuItem>
                </Menu>
            )}
        </Box>
    );
}
export default Profile;
