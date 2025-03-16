import express from 'express';
import { generateLyrics, getAllLyrics } from '../controllers/lyricController.js';
const router = express.Router()
router.get("/lyrics", getAllLyrics);
router.post("/generate-lyrics", generateLyrics);

export default router;
