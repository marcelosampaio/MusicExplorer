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
import Spinner from "../components/Spinner";
import { useAuth } from "../contexts/AuthContext";
import { searchMusic } from "../services/iTunesDataManager";
import {
  fetchFavorites,
  addFavorite,
  removeFavorite,
} from "../services/FavoritesManager";

function SlideUpTransition(props) {
  return <Slide {...props} direction="up" />;
}

function Home() {
  const [allResults, setAllResults] = useState([]);
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const resultsPerPage = 20;
  const currentAudio = useRef(null);
  const { user } = useAuth();

  // 🔸 Carrega favoritos do usuário autenticado
  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setFavorites([]);
        return;
      }

      try {
        const data = await fetchFavorites(user.id);
        setFavorites(data.map((f) => f.track_id));
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      }
    };
    loadFavorites();
  }, [user]);

  // 🔹 Busca músicas via iTunes API
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
      const results = await searchMusic(searchTerm);

      if (results.length === 0) {
        setAllResults([]);
        setMusics([]);
        setErrorMessage(`Nenhum resultado encontrado para "${searchTerm}".`);
        setPage(1);
        return;
      }

      setAllResults(results);
      setPage(1);
      setMusics(results.slice(0, resultsPerPage));
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
    fetchMusics(searchTerm);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(allResults.length / resultsPerPage))
      return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFavorite = async (musicId) => {
    if (!user) {
      setSnackbar({
        open: true,
        message: "Faça login para adicionar músicas aos seus favoritos 🎧",
      });
      return;
    }

    const isFav = favorites.includes(musicId);
    const selectedMusic = allResults.find((m) => m.id === musicId);
    if (!selectedMusic) return;

    try {
      if (isFav) {
        await removeFavorite(user.id, musicId);
        setFavorites((prev) => prev.filter((fid) => fid !== musicId));
      } else {
        await addFavorite(user.id, selectedMusic);
        setFavorites((prev) => [...prev, musicId]);
      }
    } catch (error) {
      console.error("Erro ao atualizar favoritos:", error);
      setSnackbar({
        open: true,
        message: "Erro ao atualizar favoritos. Tente novamente.",
      });
    }
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

      {loading ? (
        <Spinner />
      ) : errorMessage ? (
        <Typography align="center" color="error" sx={{ my: 4 }}>
          {errorMessage}
        </Typography>
      ) : (
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
            "& .MuiAlert-message": { textAlign: "center" },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Home;
