import supabase from "./SupabaseClient";

export async function fetchFavorites(userId, fullData = false) {
  if (!userId) return [];

  const columns = fullData
    ? "*"
    : "track_id";

  const { data, error } = await supabase
    .from("favorites")
    .select(columns)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function addFavorite(userId, track) {
  const { error } = await supabase.from("favorites").insert({
    user_id: userId,
    track_id: track.id,
    track_name: track.title,
    artist_name: track.artist,
    artwork_url: track.cover,
    preview_url: track.preview,
  });
  if (error) throw new Error(error.message);
}

export async function removeFavorite(userId, trackId) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("track_id", trackId);
  if (error) throw new Error(error.message);
}
