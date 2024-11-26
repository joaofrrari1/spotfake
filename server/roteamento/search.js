const express = require('express');

const router = express.Router()
const db = require('../db')
// Global search route
router.get('/', async (req, res) => {
    const { q } = req.query
    if (!q) {
        return res.status(400).json({ error: 'Query parameter "q" is required' })
    }
    try {
        const [songs, albums, artists] = await Promise.all([
            db.query('SELECT * FROM songs WHERE title ILIKE $1', [`%${q}%`]),
            db.query('SELECT * FROM albums WHERE title ILIKE $1', [`%${q}%`]),
            db.query('SELECT * FROM artists WHERE nome ILIKE $1', [`%${q}%`]),
        ])
        res.status(200).json({
            songs: songs.rows,
            albums: albums.rows,
            artists: artists.rows,
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
})
module.exports = router

module.exports = router;

const router = express.Router();

module.exports = router;
