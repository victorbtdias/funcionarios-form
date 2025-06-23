import { Box, CircularProgress, Link, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { DefaultButton } from "../components/common/button/Button";
import { DefaultInput } from "../components/common/input/Input";
import { DefaultSwitch } from "../components/common/input/Switch";
import { DefaultStepper } from "../components/stepper/Stepper";
import { DefaultBreadcrumbs } from "../components/breadcrumbs/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { colaboradorService } from "../services/colaboradorService";
import { DefaultSnackbar } from "../components/common/snackbar/Snackbar";
import { DefaultLinearProgress } from "../components/progress/Linear";

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

const departamentos = [
  { value: "Design", label: "Design" },
  { value: "TI", label: "TI" },
  { value: "Marketing", label: "Marketing" },
  { value: "Produto", label: "Produto" },
];

export default function CadastroColaborador() {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(true);
  const [departamento, setDepartamento] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateStep = () => {
    if (activeStep === 0) {
      if (!nome.trim() || !email.trim()) {
        setError("Todos os campos são obrigatórios");
        return false;
      }
    }
    if (activeStep === 1) {
      if (!departamento) {
        setError("Selecione um departamento");
        return false;
      }
    }
    return true;
  };

  const handleNext = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateStep()) return;

    if (activeStep === 0) {
      setActiveStep(1);
      setSuccess("Primeira etapa concluída com sucesso");
      return;
    } else {
      setIsLoading(true);
      try {
        await colaboradorService.create({
          nome,
          email,
          status,
          departamento,
        });
        navigate("/", {
          state: { successMessage: "Colaborador salvo com sucesso" },
        });
      } catch (err) {
        setError("Erro ao salvar colaborador");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <form onSubmit={handleNext}>
      <Box sx={{ mt: "12px", pl: "40px", pr: "94px" }}>
        <Box sx={{ height: 22 }}>
          <DefaultBreadcrumbs breadcrumbs={breadcrumbs} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: "18px" }}>
          <DefaultLinearProgress
            progress={`${activeStep === 0 ? 0 : 50}%`}
            value={activeStep === 0 ? 0 : 50}
          />
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
                steps={[
                  { label: "Infos Básicas" },
                  { label: "Infos Profissionais" },
                ]}
                height={activeStep === 0 ? 168 : 88}
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
                  <DefaultInput
                    label="Título"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <DefaultInput
                    label="E-mail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Box>
                    <DefaultSwitch
                      label="Ativar ao criar"
                      checked={status}
                      onChange={(e) => setStatus(e.target.checked)}
                    />
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
                    value={departamento}
                    onChange={(e) => setDepartamento(e.target.value)}
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
              disabled={activeStep === 0 ? true : false}
            />
            <DefaultButton
              label={
                activeStep === 0 ? (
                  "Próximo"
                ) : isLoading ? (
                  <CircularProgress size={30} color="inherit" />
                ) : (
                  "Concluir"
                )
              }
              width={91}
              type="submit"
              disabled={isLoading}
            />
          </Box>
        </Box>
        <DefaultSnackbar
          open={!!error}
          duration={3000}
          onClose={() => setError("")}
          message={error}
          color="error"
        />
        <DefaultSnackbar
          open={!!success}
          duration={3000}
          onClose={() => setSuccess("")}
          message={success}
          color="success"
        />
      </Box>
    </form>
  );
}
