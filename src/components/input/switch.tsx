import { FormControlLabel, styled, Switch, SwitchProps } from "@mui/material";

interface InputProps {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SwitchInput = ({ label, checked, onChange }: InputProps) => {
  const DefaultSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" {...props} />
  ))(() => ({
    width: 33,
    height: 20,
    padding: 0,
    marginLeft: 11,
    marginRight: 9,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 3,
      "&.Mui-checked": {
        transform: "translateX(13px)",
        color: "white",
        "& + .MuiSwitch-track": {
          backgroundColor: "#22c55e",
          opacity: 1,
        },
      },
    },
    "& .MuiSwitch-thumb": {
      width: 14,
      height: 14,
      boxShadow: "none",
    },
    "& .MuiSwitch-track": {
      borderRadius: "50px",
    },
  }));

  return (
    <FormControlLabel
      control={<DefaultSwitch checked={checked} onChange={onChange} />}
      label={label}
      sx={{ height: 38 }}
      slotProps={{
        typography: {
          sx: {
            fontSize: 14,
            fontWeight: 300,
            color: "text.primary",
          },
        },
      }}
    />
  );
};
