import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import SearchBar from "../components/SearchBar";
import MusicList from "../components/MusicList";
import { useAuth } from "../contexts/AuthContext";

// Função auxiliar para animação do Snackbar
function SlideUpTransition(props) {
  return <Slide {...props} direction="up" />;
}

function Home() {
  const [allResults, setAllResults] = useState([]);
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [_, setTerm] = useState("");
  const [page, setPage] = useState(1);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const resultsPerPage = 20;
  const currentAudio = useRef(null);
  const { user } = useAuth();

  // Busca músicas da API iTunes
  const fetchMusics = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setAllResults([]);
      setMusics([]);
      setErrorMessage("Digite um termo para buscar.");
      setPage(1);
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `https://corsproxy.io/?https://itunes.apple.com/search?term=${encodeURIComponent(
          searchTerm
        )}&media=music&limit=200`
      );
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setAllResults([]);
        setMusics([]);
        setErrorMessage(`Nenhum resultado encontrado para "${searchTerm}".`);
        setPage(1);
        return;
      }

      const formatted = data.results.map((item) => ({
        id: item.trackId,
        title: item.trackName,
        artist: item.artistName,
        cover: item.artworkUrl100.replace(/(\d+)x\1bb/, "600x600bb"),
        preview: item.previewUrl,
      }));

      setAllResults(formatted);
      setPage(1);
      setMusics(formatted.slice(0, resultsPerPage));
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
      setAllResults([]);
      setMusics([]);
      setErrorMessage("Ocorreu um erro ao buscar músicas. Tente novamente.");
      setPage(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const start = (page - 1) * resultsPerPage;
    setMusics(allResults.slice(start, start + resultsPerPage));
  }, [page, allResults]);

  const handleSearch = (searchTerm) => {
    setTerm(searchTerm);
    fetchMusics(searchTerm);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(allResults.length / resultsPerPage)) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Novo: valida login antes de favoritar
  const toggleFavorite = (id) => {
    if (!user) {
      setSnackbar({
        open: true,
        message: "Faça login para adicionar músicas aos seus favoritos 🎧",
      });
      return;
    }

    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const playPreview = (previewUrl) => {
    if (!previewUrl) return;

    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current = null;
    }

    const audio = new Audio(previewUrl);
    audio.play();
    currentAudio.current = audio;
    audio.onended = () => {
      currentAudio.current = null;
    };
  };

  const totalPages = Math.ceil(allResults.length / resultsPerPage);

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "" });
  };

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2, md: 3 },
        mt: 2,
        maxWidth: 1200,
        mx: "auto",
        width: "100%",
      }}
    >
      <SearchBar onSearch={handleSearch} />

      {loading && (
        <Typography align="center" sx={{ my: 4 }}>
          Carregando...
        </Typography>
      )}

      {!loading && errorMessage && (
        <Typography align="center" color="error" sx={{ my: 4 }}>
          {errorMessage}
        </Typography>
      )}

      {!loading && !errorMessage && (
        <>
          <MusicList
            musics={musics}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onPlayPreview={playPreview}
          />

          {totalPages > 1 && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 3 }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#1DB954",
                  "&:hover": { bgcolor: "#1ed760" },
                  textTransform: "none",
                  px: 3,
                }}
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1 || loading}
              >
                Anterior
              </Button>
              <Typography>
                Página {page} de {totalPages}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#1DB954",
                  "&:hover": { bgcolor: "#1ed760" },
                  textTransform: "none",
                  px: 3,
                }}
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages || loading}
              >
                Próximo
              </Button>
            </Stack>
          )}
        </>
      )}

      {/* Snackbar customizado estilo Spotify */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        TransitionComponent={SlideUpTransition}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          icon={false}
          sx={{
            width: "100%",
            bgcolor: "#1DB954",
            color: "#fff",
            fontWeight: 500,
            fontSize: 15,
            borderRadius: 2,
            boxShadow: 4,
            "& .MuiAlert-message": {
              textAlign: "center",
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Home;
