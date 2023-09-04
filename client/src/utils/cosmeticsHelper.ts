import { SxProps, Theme, createTheme } from "@mui/material";

export const colorPalette = {
    WHITE: "#FFFFFF"
}

export const footerButton: SxProps = {
    position: "absolute",
    bottom: "7vh",
    left: "50%",
    transform: "translate(-50%, -50%)"
};

export const customTheme: Theme = createTheme({
    palette: {
        primary: {
            main: "#404258",
            contrastText: "#FFFFFF"
        },
        secondary: {
            main: "#474E68",
            contrastText: "#FFFFFF"
        },
        info: {
            main: "#6B728E",
            contrastText: "#FFFFFF"
        }
    }
});

export const pageContainer: SxProps = {
    bgcolor: `#FFFFFF`
}

export const footerNavigation: SxProps = {
    bgcolor: `${customTheme.palette.info.main}`,
    height: "6vh",
    padding: "0px"
}

export const selectableListItem: SxProps = {
    bgcolor: `${customTheme.palette.secondary.main}`,
    color: colorPalette.WHITE,
    padding: "5px",
    paddingLeft: "15px",
    marginBottom: "3px",
    borderRadius: "5px"
}