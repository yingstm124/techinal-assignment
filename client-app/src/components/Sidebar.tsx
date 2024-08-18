import {
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    Toolbar,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import useDevice from "../hooks/useDevice";
import CloseIcon from "@mui/icons-material/Close";

interface IRoute {
    name: string;
    icon: ReactNode;
    route: string;
}

const menu: IRoute[] = [
    {
        name: "Friends",
        route: "/",
        icon: <PeopleIcon />,
    },
    {
        name: "Groups",
        route: "/groups",
        icon: <Diversity3Icon />,
    },
];

export const SIDEBAR_WIDTH = 200;

function Sidebar({
    openSidebar,
    onClose,
}: {
    openSidebar: boolean;
    onClose: () => void;
}) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { isMobileTablet } = useDevice();

    return (
        <Box display="flex" justifyContent="flex-start">
            <Drawer
                open={openSidebar}
                variant={isMobileTablet ? "temporary" : "permanent"}
                sx={{
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: SIDEBAR_WIDTH,
                    },
                }}
            >
                <Toolbar>
                    {isMobileTablet && (
                        <IconButton
                            sx={{ color: "text.primary" }}
                            onClick={onClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                </Toolbar>
                <Divider />
                <List>
                    {menu.map((i: IRoute, index: number) => (
                        <ListItem key={index}>
                            <Button
                                sx={{ marginX: 2 }}
                                variant={
                                    pathname === i.route ? "contained" : "text"
                                }
                                startIcon={i.icon}
                                onClick={() => {
                                    navigate(i.route);
                                }}
                            >
                                {i.name}
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
export default Sidebar;
