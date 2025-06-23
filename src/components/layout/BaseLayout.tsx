import { Box } from "@mui/material";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export default function BaseLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          ml: "280px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          pb: "100px",
        }}
      >
        <Header />
        <Outlet />
      </Box>
    </Box>
  );
}
