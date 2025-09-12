const express = require('express')

const server = express()
server.use(express.json())

server.get('/', (req, res) => {
    res.send('hello from homepage');
});

module.exports = server