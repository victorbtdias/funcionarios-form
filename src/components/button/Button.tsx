import { Button } from "@mui/material";

interface ButtonProps {
  label: string;
  width: number;
  onClick: () => void;
  bgcolor?: string;
  color?: string;
  disabled?: boolean;
}

export const DefaultButton = ({
  label,
  width,
  onClick,
  bgcolor = "primary.main",
  color = "white",
  disabled = false,
}: ButtonProps) => {
  return (
    <Button
      variant="text"
      onClick={onClick}
      disabled={disabled}
      sx={{
        bgcolor,
        width,
        height: 48,
        color,
        textTransform: "none",
        borderRadius: "8px",
        fontSize: 15,
        fontWeight: 600,
        "&.Mui-disabled": {
          color: "#919eabcc",
        },
      }}
    >
      {label}
    </Button>
  );
};
