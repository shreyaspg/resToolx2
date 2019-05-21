import green from "@material-ui/core/colors/green";
import { createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    type: "dark",
    secondary: green
  },
  typography: {
    useNextVariants: true
  }
});

export default theme;
