const router = require("express").Router();
const axios = require("axios");
const moment = require("moment");
require("dotenv").config()
router.get("/api/guardian", function(req, res) {
    var currentDate = moment().format('YYYY-MM-DD');
    var queryArticles = "https://content.guardianapis.com/search?to-date=" + currentDate + "&order-by=newest&section=us-news&q=coronavirus&api-key=" + process.env.KIERANAPIKEY;
    axios.get(queryArticles).then(function(response) {
        res.json(response.data)
    })
})

router.get("/api/covid/:zipcode", function(req, res) {
    const zipCode = req.params.zipcode;
    var queryURL = "https://api.weather.com/v3/wx/disease/tracker/county/60day?postalKey=" + zipCode + ":US&format=json&apiKey=" + process.env.APIKEY;
    axios.get(queryURL).then(function(response) {
        res.json(response.data)
    })
})

module.exports = router;