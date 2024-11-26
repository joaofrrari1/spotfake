const express = require('express');

const router = express.Router()
const db = '../db.js'
// Get recommendations based on user activity
router.get('/', async (req, res) => {
    try {
        // For simplicity, recommend the most listened-to genres or random music
        const recommendations = await db.query(`
            SELECT songs.* FROM songs
            JOIN (
                SELECT song_id, COUNT(*) as play_count
                FROM playback_history
                GROUP BY song_id
                ORDER BY play_count DESC
                LIMIT 10
            ) as popular_songs
            ON songs.id = popular_songs.song_id
        `)
        res.status(200).json(recommendations.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
module.exports = router

module.exports = router;

const router = express.Router();

module.exports = router;
