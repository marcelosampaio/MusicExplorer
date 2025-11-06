const BASE_URL = "https://itunes.apple.com/search";
const PROXY = "https://corsproxy.io/?";

export async function searchMusic(term, limit = 200) {
  if (!term.trim()) {
    throw new Error("Termo de busca vazio");
  }

  const url = `${PROXY}${BASE_URL}?term=${encodeURIComponent(
    term
  )}&media=music&limit=${limit}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erro na comunicação com a API iTunes");
  }

  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    return [];
  }

  return data.results.map((item) => ({
    id: item.trackId,
    title: item.trackName,
    artist: item.artistName,
    cover: item.artworkUrl100
      ? item.artworkUrl100.replace(/[\d]+x[\d]+bb\.jpg/, "600x600bb.jpg")
      : "",
    preview: item.previewUrl || null,
  }));
}
