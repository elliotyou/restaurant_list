const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim()
  return Restaurant.find({
    "$or": [
      { "name": { $regex: `${keyword}`, $options: '$i' } },
      { "category": { $regex: `${keyword}`, $options: '$i' } }
    ]
  })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.log(error))
})

module.exports = router