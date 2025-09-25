import MusicCard from "./MusicCard";

function MusicList({ musics }) {
  return (
    <div className="music-list">
      {musics.map((m, idx) => (
        <MusicCard key={idx} title={m.title} artist={m.artist} cover={m.cover} />
      ))}
    </div>
  );
}

export default MusicList;
