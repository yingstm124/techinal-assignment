import { Grid, List } from "@mui/material";
import Friend from "../components/Friend";
import { useAuthContext } from "../components/Auth/AuthProvider";

interface IFriend {
    userId: string;
    name: string;
}

const mockFriends: IFriend[] = [
    {
        userId: "alice",
        name: "Alice",
    },
    {
        userId: "john",
        name: "John",
    },
    {
        userId: "hong",
        name: "Hong",
    },
];

function HomePage() {
    const { user, onlineUsers } = useAuthContext();
    return (
        <Grid container direction="column">
            <Grid item container paddingX={1}>
                <List
                    sx={{
                        width: "100%",
                        bgcolor: "background.default",
                    }}
                >
                    {mockFriends
                        .filter((i) => i.userId !== user?.userName)
                        .map((i, index: number) => (
                            <Friend
                                key={index}
                                userId={i.userId}
                                name={i.name}
                                isOnline={onlineUsers[i.userId] !== undefined}
                            />
                        ))}
                </List>
            </Grid>
        </Grid>
    );
}
export default HomePage;
