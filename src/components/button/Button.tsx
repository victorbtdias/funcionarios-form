import { Button } from "@mui/material";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps {
  label: React.ReactNode;
  width: number;
  onClick?: () => void;
  bgcolor?: string;
  color?: string;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export const DefaultButton = ({
  label,
  width,
  onClick,
  bgcolor = "primary.main",
  color = "white",
  disabled = false,
  type = "button",
}: ButtonProps) => {
  return (
    <Button
      variant="text"
      type={type}
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
          bgcolor: "white",
        },
      }}
    >
      {label}
    </Button>
  );
};
