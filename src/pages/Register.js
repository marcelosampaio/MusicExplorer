import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import { modeloSignup } from "../models/modeloSignup";
import supabase from "../services/SupabaseClient";
import { useNavigate } from "react-router-dom";

function SlideUpTransition(props) {
  return <Slide {...props} direction="up" />;
}

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(modeloSignup);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleRegister = async () => {
    setError(modeloSignup);
    setLoading(true);

    // 🔍 Validações básicas
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      setError((prev) => ({
        ...prev,
        email: { message: "E-mail é obrigatório", show: true },
      }));
      setLoading(false);
      return;
    }
    if (!emailRegex.test(email)) {
      setError((prev) => ({
        ...prev,
        email: { message: "E-mail inválido", show: true },
      }));
      setLoading(false);
      return;
    }
    if (password === "") {
      setError((prev) => ({
        ...prev,
        password: { message: "Senha é obrigatória", show: true },
      }));
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setError((prev) => ({
        ...prev,
        password: { message: "A senha deve ter pelo menos 8 caracteres", show: true },
      }));
      setLoading(false);
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    if (!passwordRegex.test(password)) {
      setError((prev) => ({
        ...prev,
        password: {
          message:
            "A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caractere especial.",
          show: true,
        },
      }));
      setLoading(false);
      return;
    }
    if (confirmPassword === "") {
      setError((prev) => ({
        ...prev,
        confirmPassword: { message: "Confirme sua senha", show: true },
      }));
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: { message: "As senhas não coincidem", show: true },
      }));
      setLoading(false);
      return;
    }

    // 🚀 Registro no Supabase sem exigir verificação
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: null },
      });

      if (error) throw error;

      // ✅ Login automático após cadastro bem-sucedido
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      setSnackbar({
        open: true,
        message: "Conta criada com sucesso! Bem-vindo(a) 🎶",
        type: "success",
      });

      // Redireciona à Home após 2s
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error("Erro ao registrar:", err);
      setSnackbar({
        open: true,
        message: "Falha no registro: " + err.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          boxShadow: 4,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ fontWeight: 600, mb: 3, color: "text.primary" }}
        >
          Criar nova conta
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="E-mail"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error.email.show}
            helperText={error.email.show ? error.email.message : ""}
          />

          <TextField
            label="Senha"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error.password.show}
            helperText={error.password.show ? error.password.message : ""}
          />

          <TextField
            label="Confirmar senha"
            variant="outlined"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={error.confirmPassword.show}
            helperText={
              error.confirmPassword.show ? error.confirmPassword.message : ""
            }
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleRegister}
            disabled={loading}
            sx={{
              bgcolor: "#1DB954",
              "&:hover": { bgcolor: "#1ed760" },
              textTransform: "none",
              py: 1.2,
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 1, color: "text.secondary" }}
          >
            Já tem uma conta?{" "}
            <Button
              onClick={() => navigate("/login")}
              sx={{
                color: "#1DB954",
                textTransform: "none",
                fontWeight: 600,
                p: 0,
              }}
            >
              Entrar
            </Button>
          </Typography>
        </Stack>
      </Box>

      {/* Snackbar de feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        TransitionComponent={SlideUpTransition}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.type}
          sx={{
            width: "100%",
            bgcolor:
              snackbar.type === "success" ? "#1DB954" : "error.main",
            color: "#fff",
            fontWeight: 500,
            fontSize: 15,
            borderRadius: 2,
            boxShadow: 4,
            "& .MuiAlert-message": { textAlign: "center" },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Register;
