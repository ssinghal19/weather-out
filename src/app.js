const path = require('path')
const express = require('express') //load the express libraray. it imports a single function, express is actually a function as opposed to an object and is called when to create an application.
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express() //to store express application, doesn't take any argument but uses functions for the same
const port = process.env.PORT || 3000

//define paths for Express config
const publicDirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

//setup handlebars engine and view locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirectorypath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shreya'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {         //sending json 
        title: 'About me',
        name: 'Shreya'
    }) 
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help me',
        name: 'Shreya',
        msg: 'We are here to help you!'
    })
})

app.get('/weather', (req, res) => {        
    if(!req.query.address) {
        return res.send({                  
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address : req.query.address
            })
        })
    })
    // res.send([{
    //     forecast: 'Raining',
    //     location: 'India',
    //     address: req.query.address
    // }])
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: '',
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shreya',
        errorMessage: 'Help article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shreya',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('server is up on ' + port)
})
