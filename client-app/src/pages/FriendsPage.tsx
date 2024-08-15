import { Grid, GridProps, List, styled } from "@mui/material";
import Friend from "../components/Friend";

const GridLine = styled((props: GridProps) => <Grid item {...props} />)(() => ({
    padding: 8,
    marginRight: 5,
    backgroundColor: "gray",
    borderRadius: 6,
}));

interface IFriend {
    userId: string;
    name: string;
}

const mockFriends: IFriend[] = [
    {
        userId: "1",
        name: "Alice",
    },
    {
        userId: "2",
        name: "John",
    },
    {
        userId: "3",
        name: "Hong",
    },
];

function FriendsPage() {
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
                    {mockFriends.map((i, index: number) => (
                        <Friend key={index} userId={i.userId} name={i.name} />
                    ))}
                </List>
            </Grid>
        </Grid>
    );
}
export default FriendsPage;
