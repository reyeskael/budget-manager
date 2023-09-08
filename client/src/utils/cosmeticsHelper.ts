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
            contrastText: colorPalette.WHITE
        },
        secondary: {
            main: "#50577A",
            contrastText: colorPalette.WHITE
        },
        info: {
            main: "#6B728E",
            contrastText: colorPalette.WHITE
        }
    }
});

export const pageContainer: SxProps = {
    bgcolor: colorPalette.WHITE
}

export const footerNavigation: SxProps = {
    position: "absolute",
    bottom: 0,
    padding: "0px"
}

export const selectableListItem: SxProps = {
    bgcolor: `${customTheme.palette.secondary.main}`,
    color: colorPalette.WHITE,
    marginBottom: "3px",
    borderRadius: "5px"
}

export const customCard: SxProps = {
    bgcolor: `${customTheme.palette.secondary.main}`,
    color: colorPalette.WHITE,
    borderRadius: "5px"
}