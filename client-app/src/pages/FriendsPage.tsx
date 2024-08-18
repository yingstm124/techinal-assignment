import { Grid, GridProps, List, styled } from "@mui/material";
import Friend from "../components/Friend";
import { useAuthContext } from "../components/Auth/AuthProvider";

const GridLine = styled((props: GridProps) => <Grid item {...props} />)(() => ({
    padding: 8,
    marginRight: 5,
    backgroundColor: "gray",
    borderRadius: 6,
}));

interface IFriend {
    userId: string;
    name: string;
    isOnline: boolean;
}

const mockFriends: IFriend[] = [
    {
        userId: "alice",
        name: "Alice",
        isOnline: false,
    },
    {
        userId: "john",
        name: "John",
        isOnline: false,
    },
    {
        userId: "hong",
        name: "Hong",
        isOnline: false,
    },
];

function FriendsPage() {
    const { user, onlineUsers } = useAuthContext();
    console.log("onlineUsers", onlineUsers);
    return (
        <Grid container direction="column">
            <Grid item container alignItems="center" margin={2}>
                <GridLine>All</GridLine>
                <GridLine>Online</GridLine>
                <GridLine>Offline</GridLine>
            </Grid>
            <Grid item container marginX={2}>
                <List
                    sx={{
                        width: "100%",
                        bgcolor: "background.paper",
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
export default FriendsPage;
