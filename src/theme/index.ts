import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#22c55e",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#212b36",
      secondary: "#637381",
      disabled: "#919eab",
    },
  },
  typography: {
    fontFamily: `'Public Sans', sans-serif`,
  },
});
