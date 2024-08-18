import { Theme, useMediaQuery } from "@mui/material";

function useDevice() {
    const isMobileTablet = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("md")
    );
    return {
        isMobileTablet,
    };
}
export default useDevice;
