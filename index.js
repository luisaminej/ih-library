//IMPORTACIONES
const express           = require('express')
const app               = express()
const mongoose          = require("mongoose")

const book              = require('./models/Book')

//MIDDLEWARES
require('dotenv').config()

app.use(express.static('public'))
app.set("view engine", "hbs")


// RUTAS



app.get("/", (req, res) => {
    res.render("index")
})
// SERVIDOR

app.listen(process.env.PORT, () => {

})