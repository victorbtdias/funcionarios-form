import { Routes, Route } from "react-router-dom";
import ListaColaboradores from "../pages/ListaColaboradores";
import BaseLayout from "../components/layout/BaseLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<ListaColaboradores />} />
      </Route>
    </Routes>
  );
}
