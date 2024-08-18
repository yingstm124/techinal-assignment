import { Box } from "@mui/material";
import { Outlet } from "react-router";
import useDevice from "../hooks/useDevice";
import Appbar from "./Appbar";
import { useEffect, useState } from "react";
import Sidebar, { SIDEBAR_WIDTH } from "./SideBar";

function Layout() {
    const { isMobileTablet } = useDevice();
    const [openSidebar, setOpenSidebar] = useState(false);

    useEffect(() => {
        if (isMobileTablet) setOpenSidebar(false);
    }, [isMobileTablet]);

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            height="100%"
            bgcolor="background.default"
        >
            <Appbar onOpenSidebar={() => setOpenSidebar(true)} />
            <Box component="nav">
                <Sidebar
                    openSidebar={openSidebar}
                    onClose={() => setOpenSidebar(false)}
                />
            </Box>
            <Box
                component="main"
                bgcolor="background.default"
                color="text.primary"
                sx={{
                    width: isMobileTablet
                        ? "100%"
                        : `calc(100% - ${SIDEBAR_WIDTH}px)`,
                }}
                paddingTop={10}
                height={"calc(100vh - 80px)"}
            >
                <Outlet />
            </Box>
        </Box>
    );
}
export default Layout;
