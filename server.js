const express = require("express");
const PORT = process.env.PORT || 8080; 

const app = express();
app.use(express.static("public"))
const routes = require("./routes/apiRoutes")

app.use(routes)


app.listen(PORT, function() {
    console.log("listening on " + PORT)
})