const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//CREATE
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const restaurantObject = req.body
  restaurantObject.userId = req.user._id

  return Restaurant.create(restaurantObject)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//READ
router.get('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  console.log('into routes/modules/restaurants.js/READ/get...', _id, userId)
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => {
      res.render('show', { restaurant })
    })
    .catch(err => console.log(err))
})

router.get('/:restaurant_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id

  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

//UPDATE
router.put('/:restaurant_id', (req, res) => {
  const restaurantObject = req.body
  const userId = req.user._id
  restaurantObject.userId = userId
  const _id = req.params.restaurant_id

  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, restaurantObject)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.log(err))
})

//DELETE
router.delete('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id

  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router