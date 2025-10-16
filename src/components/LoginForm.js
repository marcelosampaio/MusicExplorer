import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Authentication from "../utils/Authentication";
import { useAuth } from "../contexts/AuthContext"; // ✅ import do contexto global

function LoginForm() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ acessa usuário autenticado globalmente

  // Se o usuário já estiver logado, redireciona direto para o perfil
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.email.trim() || !userData.password.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      console.log("🔑 Tentando login via Supabase...");
      const { data, error } = await Authentication.login(
        userData.email,
        userData.password
      );

      console.log("Resposta Supabase:", { data, error });

      if (error) {
        setError("Credenciais inválidas. Verifique seu e-mail e senha.");
        return;
      }

      if (data?.user) {
        console.log("✅ Login realizado com sucesso:", data.user);
        // Aqui não precisamos setar nada manualmente
        // O AuthProvider será atualizado automaticamente via Supabase listener
      } else {
        setError("Nenhum usuário retornado pelo Supabase.");
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      setError("Ocorreu um erro ao tentar fazer login.");
    } finally {
      setLoading(false);
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

      <TextField
        label="E-mail"
        name="email"
        type="email"
        value={userData.email}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Senha"
        name="password"
        type="password"
        value={userData.password}
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
