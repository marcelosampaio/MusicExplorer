import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import Authentication from "../utils/Authentication";

function LoginForm() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.email.trim() || !user.password.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // 🔍 Logs de depuração:
      console.log("=== Tentando login no Supabase ===");
      console.log("Email digitado:", user.email);
      console.log("Senha digitada:", user.password);
      console.log("Objeto Authentication:", Authentication);
      console.log("Chamando Authentication.login...");

      const { data, error } = await Authentication.login(
        user.email,
        user.password
      );

      console.log("Resposta do Supabase:", { data, error });

      if (error) {
        console.error("Erro retornado pelo Supabase:", error);
        setError("Credenciais inválidas. Verifique seu e-mail e senha.");
        return;
      }

      if (data?.user) {
        console.log("Usuário autenticado com sucesso:", data.user);
        setSuccess("Login realizado com sucesso!");
      } else {
        console.warn("Nenhum usuário retornado pelo Supabase.");
      }
    } catch (err) {
      console.error("Erro inesperado durante o login:", err);
      setError("Ocorreu um erro ao tentar fazer login.");
    } finally {
      setLoading(false);
      console.log("=== Fim do fluxo de login ===");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        mt: 6,
        mx: "auto",
        maxWidth: 400,
        px: 3,
        py: 4,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
        Login
      </Typography>

      {error && <Alert severity="error" sx={{ width: "100%" }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ width: "100%" }}>{success}</Alert>}

      <TextField
        label="E-mail"
        name="email"
        type="email"
        value={user.email}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Senha"
        name="password"
        type="password"
        value={user.password}
        onChange={handleChange}
        fullWidth
        required
      />

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        fullWidth
        sx={{
          mt: 2,
          bgcolor: "#1DB954",
          color: "#fff",
          fontSize: 16,
          py: 1.2,
          "&:hover": { bgcolor: "#17a348" },
          textTransform: "none",
        }}
      >
        {loading ? "Entrando..." : "Entrar"}
      </Button>
    </Box>
  );
}

export default LoginForm;
