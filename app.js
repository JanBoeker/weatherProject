const express = require("express");
const https = require("https");

const app = express();

const appID = "90e18639705aaf20e2812372d2aa96ce";

app.get("/", function(req, res) {

  var url = "https://api.openweathermap.org/data/2.5/weather?q=Munich&APPID=90e18639705aaf20e2812372d2aa96ce&units=metric";

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      // JSON.parse macht aus einem String ein javascript Objekt
      // JSON.stringify macht aus dem javascript Objekt einen String
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const city = weatherData.name
      const imageURL = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";

      res.write("<p>The weather is currently: " + weatherDescription + "</p>");
      res.write("<h1>The temperatur in " + city + " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + imageURL + ">");

      res.send();
    });

    //res.send("Server is up an running.");
  });
});

app.listen(3000, function() {
  console.log("Server running on port 3000.");
});
