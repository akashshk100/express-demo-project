
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { get } = require('http')

const app = express()
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'public/templates/views'))
hbs.registerPartials(path.join(__dirname, 'public/templates/partials'))


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
    res.send({
        temperature: 23,
        city: req.query.address
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