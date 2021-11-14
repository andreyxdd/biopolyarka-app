import { createTheme, responsiveFontSizes } from "@mui/material/styles";
// import { red } from "@mui/material/colors";

// Create a theme instance
let theme = createTheme({
  palette: {},
});

theme = responsiveFontSizes(theme);

export default theme;
