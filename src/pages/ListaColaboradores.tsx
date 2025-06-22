import { ArrowDownwardRounded, ArrowUpwardRounded } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sortByField } from "../utils/sort";
import { DefaultButton } from "../components/button/Button";
import { CircularLoading } from "../components/progress/CircularLoading";
import { Colaborador } from "../components/types/colaborador";
import { colaboradorService } from "../services/colaboradorService";
import { DefaultSnackbar } from "../components/snackbar/Snackbar";

export default function ListaColaboradores() {
  const navigate = useNavigate();
  const location = useLocation();

  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<keyof Colaborador | "">("nome");
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

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field as keyof Colaborador);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return (
        <ArrowDownwardRounded sx={{ fontSize: 18, color: "text.secondary" }} />
      );
    }
    return sortDirection === "asc" ? (
      <ArrowUpwardRounded sx={{ fontSize: 18, color: "text.secondary" }} />
    ) : (
      <ArrowDownwardRounded sx={{ fontSize: 18, color: "text.secondary" }} />
    );
  };

  const sortedColaboradores = sortByField<Colaborador>(
    colaboradores,
    sortField as keyof Colaborador,
    sortDirection
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "35px",
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
        <TableContainer
          sx={{
            mt: "31px",
            borderRadius: "16px",
            boxShadow:
              "0px 12px 24px -4px #919eab1f, 0px 0px 2px 0px #919eab33",
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: "#f4f6f8",
                  height: 56,
                  "& th": { borderBottom: "none" },
                }}
              >
                <TableCell
                  sx={{
                    color: "text.secondary",
                    fontSize: 14,
                    cursor: "pointer",
                    width: 269.5,
                  }}
                  onClick={() => handleSort("nome")}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    Nome
                    {getSortIcon("nome")}
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    color: "text.secondary",
                    fontSize: 14,
                    cursor: "pointer",
                    width: 269.5,
                  }}
                  onClick={() => handleSort("email")}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    Email
                    {getSortIcon("email")}
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    color: "text.secondary",
                    fontSize: 14,
                    cursor: "pointer",
                    width: 269.5,
                  }}
                  onClick={() => handleSort("departamento")}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    Departamento
                    {getSortIcon("departamento")}
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    color: "text.secondary",
                    fontSize: 14,
                    cursor: "pointer",
                    width: 269.5,
                  }}
                  onClick={() => handleSort("status")}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    Status
                    {getSortIcon("status")}
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedColaboradores.map((colaborador) => (
                <TableRow
                  key={colaborador.id}
                  sx={{
                    height: 72,
                    "&:hover": { bgcolor: "#f4f6f8" },
                    "&:last-child td": { border: 0 },
                    "& td": { borderBottom: "1px solid #919eab33" },
                  }}
                >
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Avatar sx={{ width: 40, height: 40 }} />
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 300,
                          color: "text.primary",
                        }}
                      >
                        {colaborador.nome}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 300,
                        color: "text.primary",
                      }}
                    >
                      {colaborador.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 300,
                        color: "text.primary",
                      }}
                    >
                      {colaborador.departamento}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={colaborador.status ? "Ativo" : "Inativo"}
                      size="small"
                      sx={{
                        fontSize: 12,
                        fontWeight: 600,
                        borderRadius: 1,
                        bgcolor: colaborador.status ? "#e8f5e8" : "#ff563029",
                        color: colaborador.status ? "#118d57" : "#b71d18",
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <DefaultSnackbar
        open={!!snackbarMessage}
        duration={3000}
        onClose={() => setSnackbarMessage("")}
        message={snackbarMessage}
        color="success"
      />
    </>
  );
}
