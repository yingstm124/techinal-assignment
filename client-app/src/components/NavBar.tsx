import { Box, Button } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import Diversity3Icon from "@mui/icons-material/Diversity3";

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

function NavBar() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <Box display="flex" justifyContent="flex-start">
            {menu.map((i: IRoute, index: number) => (
                <Button
                    key={index}
                    sx={{ marginX: 2 }}
                    variant={pathname === i.route ? "contained" : "text"}
                    startIcon={i.icon}
                    onClick={() => {
                        navigate(i.route);
                    }}
                >
                    {i.name}
                </Button>
            ))}
        </Box>
    );
}
export default NavBar;
