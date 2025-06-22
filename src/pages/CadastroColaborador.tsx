import { Box, LinearProgress, Link, Typography } from "@mui/material";
import { useState } from "react";
import { DefaultButton } from "../components/button/Button";
import { DefaultInput } from "../components/input/Input";
import { SwitchInput } from "../components/input/switch";
import { DefaultStepper } from "../components/stepper/stepper";
import { DefaultBreadcrumbs } from "../components/breadcrumbs/breadcrumbs";

const breadcrumbs = [
  <Link
    underline="none"
    color="inherit"
    href="/"
    sx={{ fontSize: 14, fontWeight: 300, color: "text.primary" }}
  >
    Colaboradores
  </Link>,
  <Typography sx={{ fontSize: 14, fontWeight: 300, color: "text.disabled" }}>
    Cadastrar Colaborador
  </Typography>,
];

const steps = [{ label: "Infos Básicas" }, { label: "Infos Profissionais" }];

const departamentos = [
  { value: "design", label: "Design" },
  { value: "ti", label: "TI" },
  { value: "marketing", label: "Marketing" },
  { value: "produto", label: "Produto" },
];

export default function CadastroColaborador() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ mt: "12px", pl: "2px", pr: "94px" }}>
      <Box sx={{ height: 22 }}>
        <DefaultBreadcrumbs breadcrumbs={breadcrumbs} />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", mt: "18px" }}>
        <LinearProgress
          variant="determinate"
          value={activeStep == 0 ? 0 : 50}
          sx={{ height: 4, borderRadius: 1, width: "100%", mr: 1 }}
        />
        <Typography
          sx={{ fontSize: 12, fontWeight: 300, color: "text.secondary" }}
        >
          {`${activeStep == 0 ? 0 : 50}%`}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: 440,
          mt: "31px",
        }}
      >
        <Box sx={{ display: "flex", gap: "40px" }}>
          <Box>
            <DefaultStepper
              activeStep={activeStep}
              steps={steps}
              height={activeStep == 0 ? 168 : 88}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              width: "100%",
            }}
          >
            {activeStep === 0 && (
              <>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: 24,
                    fontWeight: 600,
                    lineHeight: "36px",
                    color: "text.secondary",
                  }}
                >
                  Informações Básicas
                </Typography>
                <DefaultInput label="Título" />
                <DefaultInput label="E-mail" />
                <Box>
                  <SwitchInput label="Ativar ao criar" />
                </Box>
              </>
            )}
            {activeStep === 1 && (
              <>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: 24,
                    fontWeight: 600,
                    lineHeight: "36px",
                    color: "text.secondary",
                  }}
                >
                  Informações Profissionais
                </Typography>
                <DefaultInput
                  label="Selecione um departamento"
                  select
                  options={departamentos}
                />
              </>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DefaultButton
            label="Voltar"
            width={64}
            onClick={handleBack}
            bgcolor="white"
            color="text.primary"
            disabled={activeStep == 0 ? true : false}
          />
          <DefaultButton
            label={activeStep == 0 ? "Próximo" : "Concluir"}
            width={91}
            onClick={handleNext}
          />
        </Box>
      </Box>
    </Box>
  );
}
