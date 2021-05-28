const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const searchsort = require('./modules/searchsort')
const users = require('./modules/users')

const { authenticator } = require('../middleware/auth')

router.use('/restaurants', authenticator, restaurants)
router.use('/searchsort', authenticator, searchsort)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router