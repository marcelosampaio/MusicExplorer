import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Box, Button, Stack } from "@mui/material";

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/"); // redireciona para home
  };

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        p: 2,
        bgcolor: "transparent",
      }}
    >
      <Stack direction="row" spacing={2}>
        {/* Sempre visível */}
        <Button component={Link} to="/" sx={{ color: "white" }}>
          Home
        </Button>

        {/* Usuário não autenticado */}
        {!user && (
          <>
            <Button component={Link} to="/login" sx={{ color: "white" }}>
              Login
            </Button>
            <Button component={Link} to="/register" sx={{ color: "white" }}>
              Registro
            </Button>
          </>
        )}

        {/* Usuário autenticado */}
        {user && (
          <>
            <Button component={Link} to="/profile" sx={{ color: "white" }}>
              Perfil
            </Button>
            <Button
              onClick={handleLogout}
              sx={{
                color: "#fff",
                border: "1px solid #1DB954",
                "&:hover": { bgcolor: "rgba(29,185,84,0.1)" },
              }}
            >
              Logout
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
}

export default NavBar;
