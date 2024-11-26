
const db = '../db.js'
const bcrypt = 'bcrypt'
const jwt = 'jsonwebtoken'
const SECRET_KEY = 'your_secret_key'
// Helper function to hash passwords
async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}
// Register a new user
export const register = async (req, res) => {
    const { email, password, name } = req.body
    try {
        const existing = await db.query('SELECT * FROM users WHERE email = $1', [email])
        if (existing.rows.length > 0) {
            return res.status(400).json({ error: 'Email already in use' })
        }
        const hashedPassword = await hashPassword(password)
        await db.query(
            'INSERT INTO users (email, password, name, created_at, is_subscriber) VALUES ($1, $2, $3, NOW(), FALSE)',
            [email, hashedPassword, name]
        )
        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
// Login user
export const login = async (req, res) => {
    const { email, password } = req.body
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email])
        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' })
        const isValid = await bcrypt.compare(password, user.rows[0].password)
        if (!isValid) {
        const token = jwt.sign({ userId: user.rows[0].id }, SECRET_KEY, { expiresIn: '1h' })
        res.status(200).json({
            token,
            user: {
                id: user.rows[0].id,
                email: user.rows[0].email,
                name: user.rows[0].name,
                is_subscriber: user.rows[0].is_subscriber,
            },
        })