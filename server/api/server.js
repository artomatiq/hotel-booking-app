const express = require('express')
const authRoute = require('./routes/auth.js');
const usersRoute = require('./routes/users.js');
const hotelsRoute = require('./routes/hotels.js');
const roomsRoute = require('./routes/rooms.js');

const server = express()
server.use(express.json())

server.get('/', (req, res) => {
    res.send('hello from homepage');
});

server.use('/auth', authRoute)
server.use('/users', usersRoute)
server.use('/hotels', hotelsRoute)
server.use('/rooms', roomsRoute)

server.use((err, req, res, next) => {
    res.status(res.statusCode || 500).json({ message: `Server error: ${err.message}` });
});

module.exports = server