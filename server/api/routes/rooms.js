const express = require('express')
const roomController = require('../controllers/roomController')
const {verifyAdmin} = require('../utils/verifyToken')


const {createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom} = roomController

const router = express.Router()

//get all rooms
router.get('/', getAllRooms)

//get single room
router.get('/:id', getRoomById)

//create new room
router.post('/:hotelid', verifyAdmin, createRoom)

//update room
router.put('/:id', verifyAdmin, updateRoom)

//delete room
router.delete('/:id', verifyAdmin, deleteRoom)

module.exports = router