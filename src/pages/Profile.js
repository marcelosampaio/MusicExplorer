import { useEffect, useState, useRef } from "react";
import { Box, Typography, Snackbar, Alert, Slide } from "@mui/material";
import MusicList from "../components/MusicList";
import Spinner from "../components/Spinner";
import UserInfo from "../components/UserInfo";
import { useAuth } from "../contexts/AuthContext";
import {
  fetchFavorites,
  removeFavorite,
} from "../services/FavoritesManager";

function SlideUpTransition(props) {
  return <Slide {...props} direction="up" />;
}

function Profile() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const currentAudio = useRef(null);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchFavorites(user.id, true);
        setFavorites(data || []);
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
        setSnackbar({
          open: true,
          message: "Erro ao carregar seus favoritos. Tente novamente.",
        });
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, [user]);

  const handleToggleFavorite = async (trackId) => {
    if (!user) return;
    try {
      await removeFavorite(user.id, trackId);
      setFavorites((prev) => prev.filter((f) => f.track_id !== trackId));
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      setSnackbar({
        open: true,
        message: "Erro ao remover favorito. Tente novamente.",
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

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "" });
  };

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2, md: 3 },
        mt: 3,
        maxWidth: 1200,
        mx: "auto",
        width: "100%",
        textAlign: "center",
      }}
    >
      <UserInfo user={user} />

      <Typography
        variant="h5"
        align="center"
        sx={{
          fontWeight: 600,
          mb: 3,
          color: "text.primary",
        }}
      >
        Meus Favoritos
      </Typography>

      {loading ? (
        <Spinner />
      ) : !user ? (
        <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
          Faça login para visualizar suas músicas favoritas 🎧
        </Typography>
      ) : favorites.length === 0 ? (
        <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
          Você ainda não adicionou músicas aos favoritos.
        </Typography>
      ) : (
        <MusicList
          musics={favorites.map((f) => ({
            id: f.track_id,
            title: f.track_name,
            artist: f.artist_name,
            cover: f.artwork_url,
            preview: f.preview_url,
          }))}
          favorites={favorites.map((f) => f.track_id)}
          onToggleFavorite={handleToggleFavorite}
          onPlayPreview={playPreview}
        />
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

export default Profile;
