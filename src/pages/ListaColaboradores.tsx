import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sortByField } from "../utils/sort";
import { DefaultButton } from "../components/common/button/Button";
import { CircularLoading } from "../components/progress/CircularLoading";
import { colaboradorService } from "../services/colaboradorService";
import { DefaultSnackbar } from "../components/common/snackbar/Snackbar";
import { DefaultTable } from "../components/table/Table";
import { Colaborador } from "../types/colaborador";

const tableFields: { value: keyof Colaborador; label: string }[] = [
  { value: "nome", label: "Nome" },
  { value: "email", label: "Email" },
  { value: "departamento", label: "departamento" },
  { value: "status", label: "Status" },
];

export default function ListaColaboradores() {
  const navigate = useNavigate();
  const location = useLocation();

  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<keyof Colaborador>("nome");
  const [sortDirection, setSortDirection] = useState("asc");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const getColaboradores = async () => {
      setIsLoading(true);
      try {
        const data = await colaboradorService.findAll();
        setColaboradores(data);
      } catch (error) {
        console.error("Erro ao carregar colaboradores", error);
      } finally {
        setIsLoading(false);
      }
    };

    getColaboradores();
  }, []);

  useEffect(() => {
    if (location.state?.successMessage) {
      setSnackbarMessage(location.state.successMessage);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const sortedColaboradores = sortByField<Colaborador>(
    colaboradores,
    sortField as keyof Colaborador,
    sortDirection
  );

  return (
    <Box sx={{ mt: "35px", px: "42px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: 24,
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          Colaboradores
        </Typography>
        <DefaultButton
          label="Novo Colaborador"
          width={161}
          onClick={() => navigate("/cadastro")}
        />
      </Box>
      {isLoading ? (
        <CircularLoading height={200} />
      ) : colaboradores.length === 0 ? (
        <Typography
          sx={{ mt: 4, textAlign: "center", color: "text.secondary" }}
        >
          Nenhum colaborador cadastrado
        </Typography>
      ) : (
        <DefaultTable
          data={sortedColaboradores}
          tableFields={tableFields}
          sortField={sortField}
          setSortField={setSortField}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      )}
      <DefaultSnackbar
        open={!!snackbarMessage}
        duration={3000}
        onClose={() => setSnackbarMessage("")}
        message={snackbarMessage}
        color="success"
      />
    </Box>
  );
}
