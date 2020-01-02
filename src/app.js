const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()

app.set('view engine','hbs')
app.use(express.static(publicPath))
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.get('', (req , res)=>{
    res.render('index', {
        title: "Weather App !!!",
        createdBy : "Pradeep Samuel"
    })
})

app.get('/help', (req , res)=>{
    res.render('index', {
        title: "Help Page",
        helpText: 'This is some helpful text.',
        createdBy : "Pradeep Samuel"
    })
})

app.get('/about', (req , res)=>{
    res.render('about', {
        title: "About ",
        createdBy : "Pradeep Samuel"
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address){
        res.send(
            {
                error: "Address should be send"
            }
        )

    }

    geocode(req.query.address, (error, {latitude, longitude, location}={}) =>{
        if(error){
            res.send(
                {
                    error:'Not able to get location, Please provide a valid location'+error
                }
            )
        }else{
                forecast(latitude, longitude, (error, forecastRes) => {
                    if(error){
                        res.send(
                            {
                                error: 'Not able to get forecast for '+ location
                            }
                        )
                    }else{
                        res.send(
                            {
                                forecast: forecastRes,
                                location: location
                            }
                        )
                    }
                })
        }
    })
})

app.get('/products', (req,res) =>{
    console.log(req.query)
    if(!req.query.search){
        res.send(
            {
                error: "Need to send a search"

            }
        )
    }
    res.send(
        {
            products : []
        }
    )
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        createdBy : "Pradeep Samuel",
        errorMessage: "Help Article not found..."
    }) 
})

app.get('*', (req, res)=>{
    res.render('error', {
        createdBy : "Pradeep Samuel",
        errorMessage: "Weather App currently not available"
    }) 
})

app.listen(4000, ()=>{
    console.log('Server is up on port 4000')
})