import { MenuItem, TextField } from "@mui/material";

interface InputProps {
  label: string;
  select?: boolean;
  options?: { value: string; label: string }[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
}

export const DefaultInput = ({
  label,
  select = false,
  options,
  value,
  onChange,
  required = true,
  type = "text",
}: InputProps) => {
  return (
    <TextField
      select={select}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      required={required}
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
            "& .MuiFormLabel-asterisk": {
              display: "none",
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
