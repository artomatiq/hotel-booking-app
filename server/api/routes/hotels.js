const express = require('express')
const hotelController = require('../controllers/hotelController')
const {verifyAdmin} = require('../utils/verifyToken')


const {createHotel, getAllHotels, getHotelById, updateHotel, deleteHotel, countByCity, countByType} = hotelController

const router = express.Router()

//get all hotels
router.get('/', getAllHotels)

//get single hotel
router.get('/:id', getHotelById)

//create new hotel
router.post('/', verifyAdmin, createHotel)

//update hotel
router.put('/:id', verifyAdmin, updateHotel)

//delete hotel
router.delete('/:id', verifyAdmin, deleteHotel)

//count hotels per city
router.get('/countByCity', countByCity)

//count hotels per type
router.get('/countByType', countByType)

module.exports = router