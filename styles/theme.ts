import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ruRU } from "@mui/material/locale";
// import { red } from "@mui/material/colors";

// Create a theme instance
let theme = createTheme(
  {
    palette: {
      primary: { main: "#ff9e01" },
      secondary: { main: "#ffffff" },
      info: { main: "#000000" },
    },
  },
  ruRU
);

theme = responsiveFontSizes(theme);

export default theme;
