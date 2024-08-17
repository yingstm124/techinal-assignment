import { Avatar, Box, Typography } from "@mui/material";
import { useAuthContext } from "./Auth/AuthProvider";

function Profile() {
  const { user } = useAuthContext();
  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Avatar />
      </Box>
      <Typography variant="subtitle1" mt={1}>
        {user?.name}
      </Typography>
    </Box>
  );
}
export default Profile;
