import lyricsData from "../models/lyricSchema.js";
export const getAllLyrics = (req, res) => {
  res.status(200).json({data:lyricsData});
};
export const generateLyrics = (req, res) => {
  const randomIndex = Math.floor(Math.random() * lyricsData.length);
  const song = lyricsData[randomIndex];

  res.json({ title: song.title, lyrics: song.lyrics });
};

