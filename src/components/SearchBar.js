function SearchBar({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const term = e.target.search.value;
    onSearch(term);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input type="text" name="search" placeholder="Buscar músicas, álbuns, artistas..." />
      <button type="submit">Buscar</button>
    </form>
  );
}

export default SearchBar;
