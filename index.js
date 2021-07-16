//IMPORTACIONES
const express           = require('express')
const app               = express()
const mongoose          = require("mongoose")
const Book = require('./models/Book')

const book              = require('./models/Book')

//MIDDLEWARES

require('dotenv').config() //VA PRIMERO

mongoose.connect(process.env.MONGODB, {
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {console.log("Conectados a MongoDB")})
    .catch((e) => console.log(e))

app.use(express.static('public'))
app.set("view engine", "hbs")


// RUTAS



app.get("/", (req, res) => {
    res.render("index")
})

app.get("/books", (req, res) => {

    Book.find({})
        .then((LibrosEcontrados) => {
            console.log(LibrosEcontrados)  // [{..}, {}..]si es un arreglo de objetos            res.render("books")
                res.render("books",{
                    libros: LibrosEcontrados  //Crear este
                })
        })
        .catch((e) => {
            console.log(e)})
})


app.get("/books/:bookId", (req, res) => {
    console.log("Este es el req.params:", req.params)
    const { bookId } = req.params
    Book.findById(bookId)
        .then(singleBook => {
            console.log(`Libro encontrado:`, singleBook)
            res.render("singleBook", {
                libro: singleBook
            })        
        })
        .catch(e => console.log(e))
})
// SERVIDOR

app.listen(process.env.PORT, () => {
 console.log("Servidor conectado")
})