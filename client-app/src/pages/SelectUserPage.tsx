import {
  Avatar,
  Box,
  Container,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import { useAuthContext } from "../components/Auth/AuthProvider";
import { useNavigate } from "react-router";

export interface IUser {
  userName: string;
  name: string;
}

const users: IUser[] = [
  {
    userName: "alice",
    name: "alice",
  },
  {
    userName: "john",
    name: "john",
  },
  {
    userName: "hong",
    name: "hong",
  },
];
function SelectUserPage() {
  const { selectUser } = useAuthContext();
  const navigate = useNavigate();
  const onSelectUser = useCallback(
    (user: IUser) => {
      selectUser(user);
      navigate("/");
    },
    [selectUser, navigate]
  );

  return (
    <Container>
      <Box display="flex">
        {users.map((i) => (
          <ListItemButton key={i.userName} onClick={() => onSelectUser(i)}>
            <Avatar />
            <Typography>{i.name}</Typography>
          </ListItemButton>
        ))}
      </Box>
    </Container>
  );
}
export default SelectUserPage;
