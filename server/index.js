const server = require('./api/server')
const mongoose = require('mongoose')

require('dotenv').config()

const PORT = process.env.PORT
const MONGO_STRING = process.env.MONGO_STRING

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_STRING)
        console.log('connected to db');
    } catch (error) {
        console.log('error connecting to db: ', error)
        throw error
    }
}

server.listen(PORT, () => {
    connectDB()
    console.log(`server running on PORT ${PORT}`)
})