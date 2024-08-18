import { AppBar, Box, IconButton } from "@mui/material";
import useDevice from "../hooks/useDevice";
import { SIDEBAR_WIDTH } from "./SideBar";
import Profile from "./Profile";
import DehazeIcon from "@mui/icons-material/Dehaze";

function Appbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
    const { isMobileTablet } = useDevice();
    return (
        <AppBar
            sx={{
                width: isMobileTablet
                    ? "100%"
                    : `calc(100% - ${SIDEBAR_WIDTH}px)`,
                backgroundColor: "background.default",
            }}
        >
            <Box
                display="flex"
                justifyContent={isMobileTablet ? "space-between" : "flex-end"}
            >
                {isMobileTablet && (
                    <IconButton
                        sx={{ color: "text.primary" }}
                        onClick={onOpenSidebar}
                    >
                        <DehazeIcon />
                    </IconButton>
                )}
                <Box>
                    <Profile />
                </Box>
            </Box>
        </AppBar>
    );
}
export default Appbar;
