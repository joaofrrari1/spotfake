const express = require('express');

const router = express.Router()
const db = '../db.js'
// Get a specific song
router.get('/:id', async (req, res) => {
    try {
        const songId = parseInt(req.params.id, 10)
        const result = await db.query('SELECT * FROM songs WHERE id = $1', [songId])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Song not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
// Log playback and return the audio URL
router.get('/:id/play', async (req, res) => {
    const { userId } = req.query // Simulated user authentication
    const songId = parseInt(req.params.id, 10)
        // Log playback to the history table
        await db.query('INSERT INTO playback_history (user_id, song_id) VALUES ($1, $2)', [userId, songId])
        // Retrieve the audio URL
        const result = await db.query('SELECT audio_url FROM songs WHERE id = $1', [songId])
        res.status(200).json({ audio_url: result.rows[0].audio_url })
// Retrieve playback history for a user
router.get('/history', async (req, res) => {
    const { userId } = req.query
        const result = await db.query(`
            SELECT songs.*, playback_history.played_at
            FROM playback_history
            JOIN songs ON playback_history.song_id = songs.id
            WHERE playback_history.user_id = $1
            ORDER BY playback_history.played_at DESC
        `, [userId])
        res.status(200).json(result.rows)
module.exports = router

module.exports = router;

const router = express.Router();

module.exports = router;
