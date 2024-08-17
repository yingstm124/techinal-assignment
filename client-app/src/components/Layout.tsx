import {
  Avatar,
  Box,
  Container,
  Divider,
  Drawer,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet } from "react-router";
import SideNavList from "./SideNavList";
import Profile from "./Profile";

const SIDE_BAR_SIZE = 200;

function Layout() {
  return (
    <>
      <Box display="flex">
        <Box sx={{ width: { sm: SIDE_BAR_SIZE } }}>
          <Drawer
            open
            variant="permanent"
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: SIDE_BAR_SIZE,
              },
            }}
          >
            <Toolbar>
              <Profile />
            </Toolbar>
            <Divider />
            <SideNavList />
          </Drawer>
        </Box>
        <Container>
          <Outlet />
        </Container>
      </Box>
    </>
  );
}
export default Layout;
