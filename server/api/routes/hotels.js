const express = require('express')
const HotelModel = require('../models/Hotel')
const hotelController = require('../controllers/hotelController')


const {createHotel, getAllHotels, getHotelById, updateHotel, deleteHotel} = hotelController

const router = express.Router()

//get all hotels
router.get('/', getAllHotels)

//get single hotel
router.get('/:id', getHotelById)

//create new hotel
router.post('/', createHotel)

//update hotel
router.put('/:id', updateHotel)

//delete hotel
router.delete('/:id', deleteHotel)

module.exports = router