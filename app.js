const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const config = require("./config");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html")


});

app.post("/", function(req, res){


 const query = req.body.cityName;
 const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + config.apiKey + "&units=metric";
  console.log(url);
  https.get(url, function(response) {
   var _statusCode = response.statusCode;
 console.log(_statusCode);

  response.on("data", function(data){
   if(_statusCode === 200){
      const weatherData = JSON.parse(data)
    const weatherDescription = weatherData.weather[0].description;
    const temp = weatherData.main.temp;
    const icon = weatherData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
     res.write("<p>The weather description says: " + weatherDescription + "</p>");
    res.write("<h1>The temperature in " + req.body.cityName + " is " + temp + "C.</h1>");
     res.write("<img src=" + imageURL + ">")
   } else {
       res.write("<h1>Sorry, we couldn't find that city.</h1>")
   }
     res.send();
   })
})
})



app.listen(3000, function() {
console.log("🚀 Server is good to go at http://localhost:3000");

})
