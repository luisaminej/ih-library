// IMPORTACIONES
const mongoose          = require("mongoose")
const Schema            = mongoose.Schema


//SCHEMA

const bookSchema        = new Schema({
    title: String,
    description: String,
    author: String,
    rating: Number
},
{
    timestamps: true //Generar el momento en el que se creó el doc
}
)


//MODELO

const Book = mongoose.model("Book", bookSchema)

//EXPORTACIÓN

module.exports = Book