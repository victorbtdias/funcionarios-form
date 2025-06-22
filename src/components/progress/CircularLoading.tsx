import { Box, CircularProgress } from "@mui/material";

interface LoadingProps {
  color?: string;
  height?: number;
}

export const CircularLoading = ({ color, height }: LoadingProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height,
      }}
    >
      <CircularProgress sx={{ color: { color } }} />
    </Box>
  );
};
