import { LinearProgress, Typography } from "@mui/material";

interface LoadingProps {
  progress: string;
  value: number;
}

export const DefaultLinearProgress = ({ progress, value }: LoadingProps) => {
  return (
    <>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{ height: 4, borderRadius: 1, width: "100%", mr: 1 }}
      />
      <Typography
        sx={{ fontSize: 12, fontWeight: 300, color: "text.secondary" }}
      >
        {progress}
      </Typography>
    </>
  );
};
