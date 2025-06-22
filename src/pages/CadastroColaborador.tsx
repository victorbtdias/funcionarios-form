import {
  Box,
  CircularProgress,
  LinearProgress,
  Link,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { DefaultButton } from "../components/button/Button";
import { DefaultInput } from "../components/input/Input";
import { SwitchInput } from "../components/input/switch";
import { DefaultStepper } from "../components/stepper/stepper";
import { DefaultBreadcrumbs } from "../components/breadcrumbs/breadcrumbs";
import { useNavigate } from "react-router-dom";
import { colaboradorService } from "../services/colaboradorService";
import { DefaultSnackbar } from "../components/snackbar/Snackbar";

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
  { value: "Design", label: "Design" },
  { value: "TI", label: "TI" },
  { value: "Marketing", label: "Marketing" },
  { value: "Produto", label: "Produto" },
];

export default function CadastroColaborador() {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(1);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(true);
  const [departamento, setDepartamento] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateStep = () => {
    if (activeStep === 1) {
      if (!nome.trim() || !email.trim()) {
        setError("Todos os campos são obrigatórios");
        return false;
      }
    }
    if (activeStep === 2) {
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

    if (activeStep === 1) {
      setActiveStep(2);
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
      <Box sx={{ mt: "12px", pl: "2px", pr: "94px" }}>
        <Box sx={{ height: 22 }}>
          <DefaultBreadcrumbs breadcrumbs={breadcrumbs} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: "18px" }}>
          <LinearProgress
            variant="determinate"
            value={activeStep === 1 ? 0 : 50}
            sx={{ height: 4, borderRadius: 1, width: "100%", mr: 1 }}
          />
          <Typography
            sx={{ fontSize: 12, fontWeight: 300, color: "text.secondary" }}
          >
            {`${activeStep === 1 ? 0 : 50}%`}
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
                height={activeStep === 1 ? 168 : 88}
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
                    <SwitchInput
                      label="Ativar ao criar"
                      checked={status}
                      onChange={(e) => setStatus(e.target.checked)}
                    />
                  </Box>
                </>
              )}
              {activeStep === 2 && (
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
              disabled={activeStep === 1 ? true : false}
            />
            <DefaultButton
              label={
                activeStep === 1 ? (
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
