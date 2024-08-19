import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useAuthContext } from "../components/Auth/AuthProvider";
import { useNavigate } from "react-router";
import useSelectUser from "../hooks/useSelectUser";
import { userContract } from "../service/contract/user.contract";

function SelectUserPage() {
  const { selectUser } = useAuthContext();
  const navigate = useNavigate();
  const [openPasswordPopup, setOpenPasswordPopup] = useState(false);
  const [user, setUser] = useState<userContract | undefined>();
  const { users } = useSelectUser();

  const onSelectUser = useCallback((selectedUser: userContract) => {
    setUser(selectedUser);
    setOpenPasswordPopup(true);
  }, []);

  const onSubmit = useCallback(async () => {
    if (!user) return;
    selectUser(user);
    navigate("/");
  }, [navigate, selectUser, user]);

  const onCancel = useCallback(() => {
    setUser(undefined);
    setOpenPasswordPopup(false);
  }, []);

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
      {openPasswordPopup && (
        <Dialog open>
          <DialogTitle>Enter password</DialogTitle>
          <DialogContent>
            <TextField label="password" type="password" />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={onSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
export default SelectUserPage;
