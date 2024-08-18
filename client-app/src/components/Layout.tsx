import { Box, Button, Grid } from "@mui/material";
import { Outlet, useNavigate } from "react-router";
import NavBar from "./NavBar";
import Profile from "./Profile";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthContext } from "./Auth/AuthProvider";

function Layout() {
    const { logout } = useAuthContext();
    const navigate = useNavigate();
    return (
        <Grid>
            <Box width="100%">
                <Box display="flex" justifyContent="flex-end" padding={1}>
                    <Profile />
                    <Button
                        startIcon={<LogoutIcon />}
                        onClick={() => {
                            navigate("/");
                            logout();
                        }}
                    >
                        Logout
                    </Button>
                </Box>
                <Box>
                    <NavBar />
                </Box>
            </Box>
            <Box>
                <Outlet />
            </Box>
        </Grid>
    );
}
export default Layout;
