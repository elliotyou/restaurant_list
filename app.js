// 2-3-A3
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const routes = require('./routes')

const usePassport = require('./config/passport')

require('./config/mongoose')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'Secret1999',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})