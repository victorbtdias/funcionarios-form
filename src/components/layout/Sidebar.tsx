import { ArrowForwardIosRounded } from "@mui/icons-material";
import { Box, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    id: "colaboradores",
    label: "Colaboradores",
    path: "/",
    icon: (
      <Box
        component="img"
        src="colaboradores_icon.svg"
        alt="icon"
        sx={{ width: 24, height: 24 }}
      />
    ),
  },
];

export const Sidebar = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        position: "fixed",
        borderRight: "1px dashed #919eab33",
        boxShadow: "none",
        zIndex: 1100,
        width: 280,
      }}
    >
      <Box sx={{ width: 248, bgcolor: "white" }}>
        <Box sx={{ height: 60 }}>
          <Box
            component="img"
            src="/logo_flugo.png"
            alt="Logo Flugo"
            sx={{ pt: "24px", width: 75, height: 28, ml: "16px" }}
          />
        </Box>
        <Box>
          {menuItems.map((item) => (
            <ListItem
              key={item.id}
              component={Link}
              to={item.path}
              sx={{
                cursor: "pointer",
                borderRadius: "8px",
                height: 44,
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    sx: { fontSize: 14, color: "text.secondary" },
                  },
                }}
              />
              <ArrowForwardIosRounded
                sx={{ color: "text.secondary", fontSize: 13 }}
              />
            </ListItem>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
