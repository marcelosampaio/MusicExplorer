const functions = require("firebase-functions");
const fetch = require("node-fetch");

exports.itunesProxy = functions.https.onRequest(async (req, res) => {
  try {
    const term = req.query.term || "";
    const apiUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&limit=200`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    // Permitir CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.json(data);
  } catch (err) {
    console.error("Erro no proxy iTunes:", err);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});
