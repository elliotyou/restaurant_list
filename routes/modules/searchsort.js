const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const sort = req.query.sort
  const keyword = req.query.keyword.trim()
  const searchCondition = {
    "$or": [
      { "name": { $regex: `${keyword}`, $options: '$i' } },
      { "category": { $regex: `${keyword}`, $options: '$i' } }
    ]
  }

  let sortMapping
  let sortForReturn = {
    isNameAsc: false,
    isNameDesc: false,
    isCategoryAsc: false,
    isRatingDesc: false
  }

  switch (sort) {
    case 'isNameAsc':
      sortMapping = { name: 'asc' }
      sortForReturn.isNameAsc = true
      break
    case 'isNameDesc':
      sortMapping = { name: 'desc' }
      sortForReturn.isNameDesc = true
      break
    case 'isCategoryAsc':
      sortMapping = { category: 'asc' }
      sortForReturn.isCategoryAsc = true
      break
    case 'isRatingDesc':
      sortMapping = { rating: 'desc' }
      sortForReturn.isRatingDesc = true
      break
  }

  return Restaurant.find(searchCondition)
    .lean()
    .sort(sortMapping)
    .then(restaurants => res.render('index', { restaurants, keyword, sortForReturn }))
    .catch(error => console.log(error))
})


module.exports = router