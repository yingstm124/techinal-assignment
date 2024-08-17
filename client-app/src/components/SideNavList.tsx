import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { ReactNode, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthContext } from "./Auth/AuthProvider";

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

function SideNavList() {
  const { logout } = useAuthContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onLogout = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  return (
    <List>
      {menu.map((i: IRoute, index: number) => (
        <ListItemButton
          key={index}
          onClick={() => {
            navigate(i.route);
          }}
          sx={
            pathname === i.route
              ? {
                  bgcolor: "gray",
                  color: "white",
                  margin: 1,
                  borderRadius: 4,
                }
              : {}
          }
        >
          <ListItemIcon
            sx={
              pathname === i.route
                ? {
                    color: "white",
                  }
                : {}
            }
          >
            {i.icon}
          </ListItemIcon>
          <ListItemText>{i.name}</ListItemText>
        </ListItemButton>
      ))}
      <ListItemButton onClick={() => onLogout()}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </ListItemButton>
    </List>
  );
}
export default SideNavList;
