// 2-3-A3

const express = require('express')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
})

// app.get('/restaurants/:restaurant_id', (req, res) => {
//   const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
//   res.render('show', { restaurant })
// })

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword.trim()
//   const restaurants = restaurantList.results.filter(restaurant => {
//     const isWordMatched = restaurant.name.toLowerCase().includes(keyword.toLowerCase())
//     const isCategoryMatched = restaurant.category.includes(keyword)
//     return isWordMatched || isCategoryMatched
//   })
//   res.render('index', { restaurants, keyword })
// })

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})