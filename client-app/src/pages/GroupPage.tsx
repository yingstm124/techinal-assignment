import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import groupService from "../service/group.service";

function GroupPage() {
  const [groups, setGroups] = useState([]);
  const [openNewGroupPopup, setOpenNewGroupPopup] = useState(false);
  const [roomName, setRoomName] = useState("");

  const getRooms = useCallback(async () => {
    const rooms = await groupService.getRooms();
    if (!rooms.data) return;
    setGroups(rooms.data);
  }, []);

  const onChangeRoomName = (val: string) => {
    setRoomName(val);
  };

  const onSubmitCreateRoom = useCallback(() => {}, []);

  useEffect(() => {
    getRooms();
  }, [getRooms]);

  return (
    <Box display="flex" flexDirection="column">
      <Button variant="contained" onClick={() => setOpenNewGroupPopup(true)}>
        New Group
      </Button>
      <Box display="flex" justifyContent="center">
        {groups.length > 0 ? (
          groups.map((i) => <Card>{i.roomName}</Card>)
        ) : (
          <Box margin={2}>-- No group --</Box>
        )}
      </Box>

      {openNewGroupPopup && (
        <Dialog open>
          <DialogContent>
            Room name :{" "}
            <input
              value={roomName}
              onChange={(e) => {
                onChangeRoomName(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenNewGroupPopup(false);
              }}
            >
              Cancel
            </Button>
            <Button>Submit</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
export default GroupPage;
