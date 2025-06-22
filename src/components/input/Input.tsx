import { MenuItem, TextField } from "@mui/material";

interface InputProps {
  label: string;
  select?: boolean;
  options?: { value: string; label: string }[];
}

export const DefaultInput = ({
  label,
  select = false,
  options,
}: InputProps) => {
  return (
    <TextField
      select={select}
      label={label}
      variant="outlined"
      slotProps={{
        input: {
          sx: {
            fontWeight: 300,
            color: "#263238",
            fontFamily: "Inter, sans-serif",
            letterSpacing: "0.16px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#263238",
              opacity: 0.16,
              borderRadius: "8px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#263238",
              opacity: 1,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1bb55c",
              opacity: 1,
            },
          },
        },
        inputLabel: {
          sx: {
            fontWeight: 300,
            color: "text.disabled",
            "&.Mui-focused": {
              color: "#1bb55c",
              fontWeight: 400,
              fontFamily: "Inter, sans-serif",
            },
            "&.MuiInputLabel-shrink:not(.Mui-focused)": {
              color: "#263238",
              fontWeight: 400,
              fontFamily: "Inter, sans-serif",
            },
          },
        },
      }}
    >
      {options &&
        options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
    </TextField>
  );
};
