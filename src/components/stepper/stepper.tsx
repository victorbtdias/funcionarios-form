import { Check } from "@mui/icons-material";
import {
  Box,
  Step,
  StepConnector,
  StepIconProps,
  StepLabel,
  Stepper,
  styled,
} from "@mui/material";

interface StepperProps {
  activeStep: number;
  steps: { label: string }[];
  height: number;
}

export const DefaultStepper = ({ activeStep, steps, height }: StepperProps) => {
  const CustomStepIcon = ({ active, completed, icon }: StepIconProps) => {
    return (
      <Box
        sx={{
          backgroundColor: completed || active ? "primary.main" : "#dfe3e8",
          color: completed || active ? "white" : "#637381",
          width: 24,
          height: 24,
          borderRadius: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 500,
          fontSize: 14,
        }}
      >
        {completed ? <Check fontSize="small" /> : icon}
      </Box>
    );
  };

  const CustomConnector = styled(StepConnector)(() => ({
    "& .MuiStepConnector-line": {
      height: "100%",
      borderColor: "#919eab33",
    },
  }));

  return (
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
      connector={<CustomConnector />}
      sx={{ width: 153, height }}
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepLabel
            slots={{ stepIcon: CustomStepIcon }}
            sx={{
              "& .MuiStepLabel-label": {
                fontWeight: 500,
                fontSize: 14,
                color:
                  index === activeStep
                    ? "text.primary"
                    : index < activeStep
                    ? "text.primary"
                    : "text.disabled",
              },
            }}
          >
            {step.label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
