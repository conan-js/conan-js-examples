import {createMuiTheme} from "@material-ui/core";
import {blueGrey} from "@material-ui/core/colors";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: blueGrey[800],
        },
        secondary: {
            main: blueGrey[500],
        },
    },
});
