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

interface TableProps<T> {
  tableFields: { value: keyof T; label: string }[];
  data: T[];
  sortField: keyof T;
  setSortField: (field: keyof T) => void;
  sortDirection: string;
  setSortDirection: (value: string) => void;
}

export const DefaultTable = <T,>({
  tableFields,
  data,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
}: TableProps<T>) => {
  const handleSort = (field: keyof T) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: keyof T) => {
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

  return (
    <TableContainer
      sx={{
        mt: "31px",
        borderRadius: "16px",
        boxShadow: "0px 12px 24px -4px #919eab1f, 0px 0px 2px 0px #919eab33",
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
            {tableFields.map((field, index) => (
              <TableCell
                key={index}
                sx={{
                  color: "text.secondary",
                  fontSize: 14,
                  cursor: "pointer",
                  width: 269.5,
                }}
                onClick={() => handleSort(field.value)}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      field.value !== "status" ? "flex-start" : "flex-end",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  {field.label}
                  {getSortIcon(field.value)}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                height: 72,
                "&:hover": { bgcolor: "#f4f6f8" },
                "&:last-child td": { border: 0 },
                "& td": { borderBottom: "1px solid #919eab33" },
              }}
            >
              {tableFields.map((field, index) => (
                <TableCell
                  key={index}
                  align={field.value !== "status" ? "left" : "right"}
                >
                  {field.value === "nome" ? (
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
                        {String(row[field.value])}
                      </Typography>
                    </Box>
                  ) : field.value === "status" ? (
                    <Chip
                      label={row[field.value] ? "Ativo" : "Inativo"}
                      size="small"
                      sx={{
                        fontSize: 12,
                        fontWeight: 600,
                        borderRadius: 1,
                        bgcolor: row[field.value] ? "#e8f5e8" : "#ff563029",
                        color: row[field.value] ? "#118d57" : "#b71d18",
                      }}
                    />
                  ) : (
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 300,
                        color: "text.primary",
                      }}
                    >
                      {String(row[field.value])}
                    </Typography>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
