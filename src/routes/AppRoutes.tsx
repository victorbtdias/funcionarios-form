import { Routes, Route } from "react-router-dom";
import ListaColaboradores from "../pages/ListaColaboradores";
import BaseLayout from "../components/layout/BaseLayout";
import CadastroColaborador from "../pages/CadastroColaborador";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<ListaColaboradores />} />
        <Route path="/cadastro" element={<CadastroColaborador />} />
      </Route>
    </Routes>
  );
}
