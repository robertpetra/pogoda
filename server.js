// https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh?hl=pl
//lepiej
//https://chrome.google.com/webstore/detail/json-viewer-pro/eifflpmocdbdmepbjaopkkhbfmdgijcc/related?hl=pl

//server.js and index.html
//npm init
//npm i express body-parser ejs


//---------------boler plate code
//https://api.openweathermap.org/data/2.5/weather?q=Warsaw&appid=6e2da3e5d9b9d3af615805a867be3808&units=metric
//http://openweathermap.org/img/wn/04d@2x.png

//dokumentacja
//https://openweathermap.org/weather-conditions

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const https = require("https");

//II
app.set("view engine", "ejs");

// app.listen(3000, function () {
//     console.log("sever started on port 3000");
// });

// III Heroku1
app.listen(process.env.PORT || 3000, function () {
    console.log("sever started on port 3000");
});
//---------------------------------


function getURLWeather(miasto) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${miasto}&appid=6e2da3e5d9b9d3af615805a867be3808&units=metric`;
}

function getURLIcon(icon) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/index.html`);
});

app.post('/', function (req, res) {
    pokazPogode(req, res);
});
//ikona
//https://openweathermap.org/weather-conditions#How-to-get-icon-URL

//ejs
//https://ejs.co/#install
//potem wiki
//https://github.com/mde/ejs/wiki/Using-EJS-with-Express


function pokazPogode(req, res) {
    var miasto = req.body.kraj;
    var urlPogoda = getURLWeather(miasto);

    https.get(urlPogoda, function (response) {

        response.on("data", function (data) {
            const danePogody = JSON.parse(data);
            // console.log(danePogody);
            const temperatura = danePogody.main.temp;
            const opis = danePogody.weather[0].description;
            const iconId = danePogody.weather[0].icon;
            const urlIcon = getURLIcon(iconId);

            //I
            //res.send(`Temperatura to ${temperatura}`);

            //II
            // res.write(`<h1>Pogoda dla ${miasto} </h1>`);
            // res.write("<h3>Opis </h3>");
            // res.write(`<p> ${opis} </p>`);
            // res.write("<h3>Temperatura </h3>");
            // res.write(`<p> ${temperatura} </p>`);
            // res.write(`<img src="${urlIcon}">`);
            // res.send();

            //III
            var odpowiedz = {
                cityName: miasto,
                desc: opis,
                temp: temperatura,
                ikonaUrl:urlIcon
            }
            //res.render("response",{cityName:miasto});
            res.render("response",odpowiedz);


        });
    });

};
