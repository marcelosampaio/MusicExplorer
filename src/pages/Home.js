import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MusicList from "../components/MusicList";

function Home() {
  const [musics, setMusics] = useState([
    { title: "Imagine", artist: "John Lennon", cover: "https://via.placeholder.com/150" },
    { title: "Hey Jude", artist: "The Beatles", cover: "https://via.placeholder.com/150" }
  ]);

  const handleSearch = (term) => {
    console.log("Buscando:", term);
    // aqui no futuro entra a chamada da API
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <MusicList musics={musics} />
    </div>
  );
}

export default Home;
