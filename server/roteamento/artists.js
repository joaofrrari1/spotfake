const express = require('express');

const router = express.Router()
const db = '../db.js'
// Get all artists
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM artists')
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
module.exports = router

module.exports = router;

const router = express.Router();

module.exports = router;
