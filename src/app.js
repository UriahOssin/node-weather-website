const path = require('path')
const express = require('express')
const hbs = require('hbs')
const weatherForcast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// Paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const app = express()

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) 

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Uriah Ossin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Uriah Ossin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Help me!',
        name: 'Uriah Ossin'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
            })
    }
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    let address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    } 

    geocode.geocode(address, (error, { latitude, longitude, location } = {} ) => {
            if (error) {
                return res.send({ error })
            }
            weatherForcast.weatherForcast(latitude, longitude, (error, weatherData) => {
                if (error) {
                    return res.send({ error })
                }
                return res.send({ 
                    address: address, 
                    location, 
                    forecast: weatherData 
                })
            })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Uriah Ossin',        
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Uriah Ossin',
        errorMessage: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Up and running on port 3000')
})