const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')

const restaurants = require('./restaurant.json')
const user = require('../user')

const SEED_USER = {
  name: 'zzz',
  email: 'zzz@zzz.zzz',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => user.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: 10 },
        (_, i) => Restaurant.create({ name: `name-${i}`, userId })
      ))
    })
    .then(() => {
      console.log('done')
      process.exit()
    })

  // restaurants.results.forEach(restaurant => {
  //   Restaurant.create({
  //     name: restaurant.name,
  //     name_en: restaurant.name_en,
  //     category: restaurant.category,
  //     image: restaurant.image,
  //     location: restaurant.location,
  //     phone: restaurant.phone,
  //     google_map: restaurant.google_map,
  //     rating: restaurant.rating,
  //     description: restaurant.description
  //   })
  // });
})

