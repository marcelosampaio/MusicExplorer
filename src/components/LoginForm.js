import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

function LoginForm() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.email.trim() || !user.password.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    // Mock de login
    if (user.email === "adm@login.com" && user.password === "123456") {
      setSuccess("Login realizado com sucesso!");
      setError("");
    } else {
      setError("Email ou senha incorretos.");
      setSuccess("");
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
        Entrar
      </Button>
    </Box>
  );
}

export default LoginForm;
