import { createContext, useContext } from "react";

// Cria o contexto
export const AuthContext = createContext(null);

// Hook auxiliar para consumir o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
