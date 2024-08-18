import { Box } from "@mui/material";
import Profile from "./Profile";
import { Outlet } from "react-router";
import Sidebar from "./SideBar";

function Layout() {
    return (
        <Box>
            <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                height="100%"
                bgcolor="background.default"
            >
                <Sidebar />
                <Profile />
            </Box>
            <Box bgcolor="background.paper" color="text.primary">
                <Outlet />
            </Box>
        </Box>
    );
}
export default Layout;
