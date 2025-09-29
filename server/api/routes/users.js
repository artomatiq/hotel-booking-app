const express = require('express')
const userController = require('../controllers/userController')
const verifyToken = require('../utils/verifyToken')

const {createUser, getAllUsers, getUserById, updateUser, deleteUser} = userController

const router = express.Router()

//check authentication
router.get('/me', verifyToken, (req, res, next) => {
     res.send("Hello, you are logged in!")
})

//get all users
router.get('/', getAllUsers)

//get single user
router.get('/:id', getUserById)

//create new user
router.post('/', createUser)

//update user
router.put('/:id', updateUser)

//delete user
router.delete('/:id', deleteUser)

module.exports = router