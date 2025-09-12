const express = require('express')
const authRoute = require('./routes/auth.js');

const server = express()
server.use(express.json())

server.get('/', (req, res) => {
    res.send('hello from homepage');
});

server.use('/auth', authRoute)

module.exports = server