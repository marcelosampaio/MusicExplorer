import { Box, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        gap: { xs: "0.5rem", sm: "1rem" },
      }}
    >
      <MuiLink
        component={Link}
        to="/"
        underline="none"
        sx={{
          color: "#fff",
          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
          transition: "opacity 0.2s ease",
          "&:hover": { opacity: 0.8 },
        }}
      >
        Home
      </MuiLink>

      <MuiLink
        component={Link}
        to="/login"
        underline="none"
        sx={{
          color: "#fff",
          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
          transition: "opacity 0.2s ease",
          "&:hover": { opacity: 0.8 },
        }}
      >
        Login
      </MuiLink>

      <MuiLink
        component={Link}
        to="/register"
        underline="none"
        sx={{
          color: "#fff",
          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
          transition: "opacity 0.2s ease",
          "&:hover": { opacity: 0.8 },
        }}
      >
        Registro
      </MuiLink>

      <MuiLink
        component={Link}
        to="/profile"
        underline="none"
        sx={{
          color: "#fff",
          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
          transition: "opacity 0.2s ease",
          "&:hover": { opacity: 0.8 },
        }}
      >
        Perfil
      </MuiLink>
    </Box>
  );
}

export default NavBar;
