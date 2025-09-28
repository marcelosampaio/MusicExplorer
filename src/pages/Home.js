import { useState, useRef } from "react";
import SearchBar from "../components/SearchBar";
import MusicList from "../components/MusicList";
import "./../styles/SearchBar.css";

function Home() {
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const currentAudio = useRef(null);

  const handleSearch = async (term) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&limit=20`
      );
      const data = await response.json();
      const formatted = data.results.map((item) => ({
        id: item.trackId,
        title: item.trackName,
        artist: item.artistName,
        cover: item.artworkUrl100,
        preview: item.previewUrl,
      }));
      setMusics(formatted);
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id) => {
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

  return (
    <div>
      <SearchBar className="search-bar" onSearch={handleSearch} />
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <MusicList
          musics={musics}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onPlayPreview={playPreview}
        />
      )}
    </div>
  );
}

export default Home;
