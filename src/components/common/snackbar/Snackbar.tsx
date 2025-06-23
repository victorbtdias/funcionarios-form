import { Alert, AlertColor, Snackbar } from "@mui/material";

interface SnackbarProps {
  open: boolean;
  duration: number;
  onClose: () => void;
  message: string;
  color: AlertColor;
}

export const DefaultSnackbar = ({
  open,
  duration,
  onClose,
  message,
  color,
}: SnackbarProps) => {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
      <Alert variant="filled" severity={color} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};
