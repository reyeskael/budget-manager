import { SxProps, Theme, createTheme } from "@mui/material";

export const footerButton: SxProps = {
    position: 'absolute',
    bottom: '7vh',
    left: '50%',
    transform: 'translate(-50%, -50%)'
};

export const customTheme: Theme = createTheme({
    palette: {
        primary: {
            main: '#2B3467',
            contrastText: '#FFFFFF'
        },
        secondary: {
            main: '#EB455F',
            contrastText: '#FFFFFF'
        },
        info: {
            main: '#FCFFE7',
            contrastText: '#FFFFFF'
        }
    }
});

export const pageContainer: SxProps = {
    // bgcolor: `${customTheme.palette.info.main}`
}

export const footerNavigation: SxProps = {
    bgcolor: `${customTheme.palette.info.main}`,
    height: '6vh',
    padding: '0px'
}