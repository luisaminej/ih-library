//IMPORTACIONES
const express           = require('express')
const app               = express()
const mongoose          = require("mongoose")
const bodyParser        = require("body-parser")

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


    app.use(bodyParser.urlencoded({extended:true}))
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

// QUERY PARAMS
// Hicimos el enlace hacía los detalles para que nos lleve a otra página
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


//QUERY STRINGS
//escribimos en el url info y nos aparece en la página
app.get("/search", (req, res) => {
    
    const queries = req.query
                                      ///TIPO DE TRANSFERENCIA DE DATOS MEDIANTE URL. EL OTRO ES CON PARAMS
    res.render("search", {
        busqueda: queries
    })
})


// SERVIDOR
// sirve para enviar datos para los botones y formularios

app.post("/search", (req, res) => {
   
    const valorFormulario = req.body
    

    res.redirect(`/search?palabra=${valorFormulario.palabra}&nombre=${valorFormulario.nombre}&apellido=${valorFormulario.apellido}`)
})






app.listen(process.env.PORT, () => {
 console.log("Servidor conectado")
})