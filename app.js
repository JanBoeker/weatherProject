const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

const appID = "90e18639705aaf20e2812372d2aa96ce";

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "90e18639705aaf20e2812372d2aa96ce";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&APPID=" + apiKey + "&units=" + unit;
  console.log(url);

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      // JSON.parse macht aus einem String ein javascript Objekt
      // JSON.stringify macht aus dem javascript Objekt einen String
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const imageURL = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";

      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperatur in " + query + " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + imageURL + ">");

      res.send();
    });
  });
});

app.listen(3000, function() {
  console.log("Server running on port 3000.");
});
