
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const { json } = require('express')

const app = express()
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'templates/views'))
hbs.registerPartials(path.join(__dirname, 'templates/partials'))


app.get('/', (req, res) => {
    res.render('index.hbs', {
        title: 'Weather App'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About Author'
    })
})

app.get('/help', (req, res)=>{
    res.render('help.hbs', {
        title: 'Help',
        helpText: 'Some help text'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "please provide address"
        })
    }
    var weather_data
    address = req.query.address
    weather_api_url = 'http://api.weatherstack.com/current?access_key=108fe864921471410c42ffa7cff3e3e8&query='+address
    request.get({url: weather_api_url, json: true}, (error, response) => {
        if(error){
            res.send({error: 'Error while connecting please try again later'})
        }
        else if(response.body.error){
            res.send({error: response.body.error.info})
        }
        else{
            // console.log(response.body.current)
            weather_data = {
                location: response.body.location.name+', '+response.body.location.country,
                temperature: response.body.current.temperature,
                weather_description: response.body.current.weather_descriptions[0],
                humidity: response.body.current.humidity,
                wind_speed: response.body.current.wind_speed,
                weather_icon: response.body.current.weather_icons[0]
            }
            res.send(weather_data)
        }
    })
})  

app.get('/help/*', (req, res) => {
    res.render('help-page-not-found.hbs', {
        title: '404'
    })
})


app.get('*', (req, res) => {
    res.render('page-not-found.hbs', {
        title: '404'
    })
})

app.listen(3000, () => {
    console.log('server is running')
})