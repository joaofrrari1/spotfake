
import pkg from 'pg';
const { Pool } = pkg;
const db = new Pool({
    user: 'postgres',  // Replace with actual DB username
    host: 'localhost', // Replace with actual DB host
    database: 'spotfake', // Replace with actual DB name
    password: 'password', // Replace with actual DB password
    port: 5432, // Default PostgreSQL port
});

module.exports = db;

async function criarTabelas() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(100) UNIQUE,
                password VARCHAR(255)
            );
        `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS artists (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                genre VARCHAR(50)
            );
        `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS albums (
                id SERIAL PRIMARY KEY,
                title VARCHAR(100),
                artist_id INT REFERENCES artists(id)
            );
        `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS songs (
                id SERIAL PRIMARY KEY,
                title VARCHAR(100),
                album_id INT REFERENCES albums(id)
            );
        `);
        console.log("Tables created successfully!");
    } catch (error) {
        console.error("Error creating tables:", error);
    }
}
