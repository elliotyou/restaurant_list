console.log('beginning of idnex.js')

const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const searchsort = require('./modules/searchsort')

router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/searchsort', searchsort)

console.log('end of idnex.js')

module.exports = router