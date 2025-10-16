import { Box, Typography } from "@mui/material";
import NavBar from "./NavBar";

function Header() {
  return (
    // Box externa: ocupa 100% da largura e encosta no topo
    <Box
      component="header"
      sx={{
        width: "100vw",
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
        top: 0,
        backgroundColor: "#1db954",
        color: "#fff",
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
        zIndex: 1200,
      }}
    >
      {/* Box interna mantém o layout visual */}
      <Box
        sx={{
          maxWidth: { xs: "100%", md: "1200px" },
          width: "100%",
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: { xs: "center", sm: "space-between" },
          p: { xs: "1rem", sm: "1.2rem 2rem", md: "1.5rem 3rem" },
          boxSizing: "border-box",
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.8rem" },
            mb: { xs: "0.5rem", sm: 0 },
          }}
        >
          🎵 Music Explorer
        </Typography>

        <NavBar />
      </Box>
    </Box>
  );
}

export default Header;
