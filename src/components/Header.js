import { Box, Typography } from "@mui/material";
import NavBar from "./NavBar";

function Header() {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: { xs: "center", sm: "space-between" },
        backgroundColor: "#1db954",
        color: "#fff",
        p: { xs: "1rem", sm: "1.2rem 2rem", md: "1.5rem 3rem" },
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
  );
}

export default Header;
