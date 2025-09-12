const server = require('./api/server')
const mongoose = require('mongoose')

require('dotenv').config()

const PORT = process.env.PORT
const MONGO_STRING = process.env.MONGO_STRING

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_STRING)
    } catch (error) {
        console.log('Error connecting to db: ', error)
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('Connection to db lost. Retrying in 3 seconds...');
    setTimeout(() => connectDB(), 3000);
})

let firstConnection = true;
mongoose.connection.on('connected', () => {
    if (firstConnection) {
        console.log('Connected to db');
        firstConnection = false;
    } else {
        console.log('Reconnected to db');
    }
});

const startServer = async () => {
    await connectDB()
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

startServer()