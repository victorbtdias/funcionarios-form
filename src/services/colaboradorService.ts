import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Colaborador } from "../types/colaborador";

export const colaboradorService = {
  create: async (dados: Colaborador) => {
    try {
      const docRef = await addDoc(collection(db, "colaboradores"), dados);

      return docRef;
    } catch (error) {
      console.error("Erro ao salvar colaborador:", error);
      throw error;
    }
  },

  findAll: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "colaboradores"));

      const colaboradores: Colaborador[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Colaborador[];

      return colaboradores;
    } catch (error) {
      console.error("Erro ao buscar colaboradores:", error);
      throw error;
    }
  },
};
