"use client";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: { primary: { main: "#5b63d9", contrastText: "#fff" }, secondary: { main: "#f29f8f" }, background: { default: "#f7f8fc", paper: "#fff" }, text: { primary: "#202743", secondary: "#78819a" } },
  shape: { borderRadius: 14 },
  typography: { fontFamily: '"DM Sans", sans-serif', button: { textTransform: "none", fontWeight: 700 } },
  components: {
    MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { borderRadius: 12, minHeight: 42 } } },
    MuiTextField: { defaultProps: { variant: "outlined" }, styleOverrides: { root: { "& .MuiOutlinedInput-root": { borderRadius: 12 } } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider>;
}
