import { Avatar, Box } from "@mui/material";

export const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: 80,
        px: "42px",
      }}
    >
      <Avatar
        sx={{
          width: 40,
          height: 40,
          border: "2px solid white",
          boxShadow: "0 0 0 2px #919aeb14",
        }}
        src="/user.png"
      />
    </Box>
  );
};
