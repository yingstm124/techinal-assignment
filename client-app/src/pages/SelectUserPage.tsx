import { Avatar, Box, Button, Typography } from "@mui/material";
import { useCallback } from "react";
import { useAuthContext } from "../components/Auth/AuthProvider";
import { useNavigate } from "react-router";
import useSelectUser from "../hooks/useSelectUser";
import { userContract } from "../service/contract/user.contract";

function SelectUserPage() {
  const { selectUser } = useAuthContext();
  const navigate = useNavigate();
  const { users } = useSelectUser();
  const onSelectUser = useCallback(
    (user: userContract) => {
      selectUser(user);
      navigate("/");
    },
    [selectUser, navigate]
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh" }}
      bgcolor="background.default"
    >
      <Box>
        <Typography variant="h6" align="center">
          Select User ...
        </Typography>
        {users.map((i) => (
          <Button key={i.userName} onClick={() => onSelectUser(i)}>
            <Box flexDirection="column" margin={4}>
              <Box margin={2}>
                <Avatar />
              </Box>
              <Typography variant="subtitle1">{i.name}</Typography>
            </Box>
          </Button>
        ))}
      </Box>
    </Box>
  );
}
export default SelectUserPage;
