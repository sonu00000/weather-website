const path =  require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000

//Define paths for express engine
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Soumajit'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Soumajit Banik'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptxt: 'This is some helpful text',
        title: 'Help',
        name: 'Soumajit Banik'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error: error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Soumajit Banik',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Soumajit Banik',
        errorMsg: 'Page not found'
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>');
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Soumajit',
//         age: 25
//     }, {
//         name: 'Pranjal',
//         age: 23
//     }]);
// })

// app.get('/about', (req, res) => {
//     res.send('<h2>This is an About page</h2>');
// })



app.listen(port, () => {
    console.log('Server is up on port ' + port);
})