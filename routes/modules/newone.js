const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  return res.render('new')
})

module.exports = router