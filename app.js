//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const city = req.body.cityName;
    const unit = "metric";
    const apiKey = "439d4b804bc8187953eb36d2a8c26a02";
    const url = "https://samples.openweathermap.org/data/2.5/find?q="+ city +"&units="+ unit +"&appid="+ apiKey;

    https.get(url, (response) => {
        console.log("statusCode", response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data)
            const weatherTemp = weatherData.list[0].main.temp
            const weatherDescription = weatherData.list[0].weather[0].description
            const weatherIcon = weatherData.list[0].weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png" 
            res.write("<p>The weather is currently " + weatherDescription + "</p>")
            res.write("<h1>The temperature in London is " + weatherTemp + "°C</h1>")
            res.write("<img src="+ imageURL +">")
            res.send()
        });

        });

});

app.listen(port, function() {
    console.log("Server is running on port " + port + ".");
});