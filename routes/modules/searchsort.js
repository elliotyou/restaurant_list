const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

function generateSearchCondition(keyword) {
  return {
    "$or": [
      { "name": { $regex: `${keyword}`, $options: '$i' } },
      { "category": { $regex: `${keyword}`, $options: '$i' } }
    ]
  }
}

function generateObjectForSort(sortString) {
  let outputObject = {
    sortForExpress: {},
    sortForHandlebars: {
      isNameAsc: false,
      isNameDesc: false,
      isCategoryAsc: false,
      isRatingDesc: false
    }
  }

  switch (sortString) {
    case 'isNameAsc':
      outputObject.sortForExpress = { name: 'asc' }
      outputObject.sortForHandlebars.isNameAsc = true
      break
    case 'isNameDesc':
      outputObject.sortForExpress = { name: 'desc' }
      outputObject.sortForHandlebars.isNameDesc = true
      break
    case 'isCategoryAsc':
      outputObject.sortForExpress = { category: 'asc' }
      outputObject.sortForHandlebars.isCategoryAsc = true
      break
    case 'isRatingDesc':
      outputObject.sortForExpress = { isRatingDesc: 'desc' }
      outputObject.sortForHandlebars.isRatingDesc = true
      break
  }

  return outputObject
}

router.get('/', (req, res) => {
  const sort = req.query.sort
  const keyword = req.query.keyword.trim()
  const searchCondition = generateSearchCondition(keyword)
  const objectForSort = generateObjectForSort(sort)
  const sortForExpress = objectForSort.sortForExpress
  const sortForHandlebars = objectForSort.sortForHandlebars

  return Restaurant.find(searchCondition)
    .lean()
    .sort(sortForExpress)
    .then(restaurants => res.render('index', { restaurants, keyword, sortForHandlebars }))
    .catch(error => console.log(error))
})


module.exports = router