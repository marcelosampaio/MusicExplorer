import "./../styles/MusicCard.css";

function MusicCard({ music, isFavorite, onToggleFavorite, onPlayPreview }) {
  return (
    <div className="music-card">
      <img src={music.cover} alt={music.title} />
      <h3>{music.title}</h3>
      <p>{music.artist}</p>
      <button onClick={() => onPlayPreview(music.preview)}>
        ▶ Preview
      </button>
      <button onClick={() => onToggleFavorite(music.id)}>
        {isFavorite ? "⭐ Favorito" : "☆ Favoritar"}
      </button>
    </div>
  );
}

export default MusicCard;
