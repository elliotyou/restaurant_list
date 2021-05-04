const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const newone = require('./modules/newone')
const search = require('./modules/search')

router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/newone', newone)
router.use('/search', search)

module.exports = router