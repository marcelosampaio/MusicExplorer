import "./../styles/MusicCard.css";

function MusicCard({ title, artist, cover }) {
  return (
    <div className="music-card">
      <img src={cover} alt={title} />
      <h3>{title}</h3>
      <p>{artist}</p>
      <button>▶ Preview</button>
      <button>⭐ Favoritar</button>
    </div>
  );
}

export default MusicCard;
