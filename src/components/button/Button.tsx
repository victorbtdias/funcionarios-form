import { Button } from "@mui/material";

interface ButtonProps {
  label: string;
  width: number;
  onClick: () => void;
}

export const DefaultButton = ({ label, width, onClick }: ButtonProps) => {
  return (
    <Button
      variant="text"
      onClick={onClick}
      sx={{
        bgcolor: "primary.main",
        width,
        height: 48,
        color: "white",
        textTransform: "none",
        borderRadius: "8px",
        fontSize: 15,
        fontWeight: 600,
      }}
    >
      {label}
    </Button>
  );
};
