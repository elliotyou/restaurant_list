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
    nameAsc: false,
    nameDesc: false,
    category: false,
    rating: false
  }

  switch (sort) {
    case 'nameAsc':
      sortMapping = { name: 'asc' }
      sortForReturn.nameAsc = true
      break
    case 'nameDesc':
      sortMapping = { name: 'desc' }
      sortForReturn.nameDesc = true
      break
    case 'categoryAsc':
      sortMapping = { category: 'asc' }
      sortForReturn.categoryAsc = true
      break
    case 'ratingDesc':
      sortMapping = { rating: 'desc' }
      sortForReturn.ratingDesc = true
      break
  }

  return Restaurant.find(searchCondition)
    .lean()
    .sort(sortMapping)
    .then(restaurants => res.render('index', { restaurants, keyword, sortForReturn }))
    .catch(error => console.log(error))
})


router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
})

router.post('/', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router