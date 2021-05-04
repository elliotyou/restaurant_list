const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
})

router.post('/', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return Restaurant.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  })
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
      restaurant.name = req.body.name
      restaurant.name_en = req.body.name_en
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.google_map = req.body.google_map
      restaurant.rating = req.body.rating
      restaurant.description = req.body.description
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