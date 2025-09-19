const express = require('express')
const HotelModel = require('../models/Hotel')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('hello from hotels route')
})

//create new hotel
router.post('/', async (req, res) => {
    const newHotel = new HotelModel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        res.status(500).json(error)
    }
})

//update hotel
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updatedHotel = await HotelModel.findByIdAndUpdate(id, {$set: req.body}, {new: true})
        res.status(200).json(updatedHotel)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router