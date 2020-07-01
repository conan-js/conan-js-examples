import {createMuiTheme} from "@material-ui/core";
import {blueGrey, green} from "@material-ui/core/colors";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[500],
        },
        secondary: {
            main: blueGrey[500],
        },
    },
});
