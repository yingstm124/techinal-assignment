import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#5865F2",
        },
        secondary: {
            main: "#23A55A",
        },
        background: {
            default: "#313338",
            paper: "#2B2D31",
        },
        text: {
            primary: "#B5BAC1",
        },
    },
    typography: {
        allVariants: {
            color: "#B5BAC1",
        },
    },
});
export default theme;
