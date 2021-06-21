const hbs = require('hbs');
const express = require('express');
const path = require('path');
const request = require('postman-request')

const app = express();
const public = path.join(__dirname, '../public')
const hbsViews = path.join(__dirname, '../temp/views')
const hbsTemp = path.join(__dirname, '../temp/partials')


app.set('view engine', 'hbs')
app.set('views', hbsViews)
hbs.registerPartials(hbsTemp)

app.use(express.static(public))

app.get('/weather', (req, res) => {
    const a = req.query
    const query = a.search
 // your api key from open weather
    const api = "64c4ab21ff1bfaffaf14d442e3b272b3"
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=" + api

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            return res.send({ error: 'unable to connect' })
        }
        else if (response.body.cod === "404") {
            return res.send({ error: response.body.message })


        }
        else if (response.body.cod === "400") {
            return res.send({ error: response.body.message })
        }
        else {

            return res.send({
                forecast: response.body.weather[0].main,
                description: response.body.weather[0].description,
                icon: response.body.weather[0].icon,
                address: query,
                temp: response.body.main.temp,
                feels: response.body.main.feels_like,
                humidity: response.body.main.humidity,
                max_temp: response.body.main.temp_max,
                latitude: response.body.coord.lat,
                long: response.body.coord.lon


            })


        }

    })

})



app.get('/', (req, res) => {
    res.render('index')


})


app.get('*', (req, res) => {
    res.send('404 not found')
})








app.listen(3000, () => {
    console.log('listen on 3000')
});