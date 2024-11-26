
const axios = 'axios'

// Base URL of the backend server
const API_BASE_URL = 'http://localhost:3000'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

module.exports = api
