import MusicCard from "./MusicCard";

function MusicList({ musics, favorites = [], onToggleFavorite, onPlayPreview }) {
  return (
    <div className="music-list">
      {musics.map((m) => (
        <MusicCard
          key={m.id}
          music={m}
          isFavorite={favorites.includes(m.id)}
          onToggleFavorite={onToggleFavorite}
          onPlayPreview={onPlayPreview}
        />
      ))}
    </div>
  );
}

export default MusicList;
