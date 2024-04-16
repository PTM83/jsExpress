// importar dependencias
const express = require('express')
const {readFileSync, writeFileSync} = require('node:fs')

const app = express()

// Se crea y se levanta el puerto
app.listen(3000, () => {
    console.log('Servidor Inicializado')
})

// Middleware
app.use(express.json())

// Middleware & Static
app.use(express.static('public'))

// Definir las rutas CRUD - Create - Read - Update - Delete
// app.get('/', (req, res) => {

//     res.json({"respuesta":'First View on Screen'})
// })

app.get('/home', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})


app.get('/canciones', (req,res) => {
    const canciones = JSON.parse(readFileSync('canciones.json', 'utf-8'))

    res.json(canciones)
})

// petición HTTP
app.post('/canciones', (req,res) => {
    const canciones = JSON.parse(readFileSync('canciones.json', 'utf-8'))
    // Traer el body desde el front
    // undefined no se esta capturando datos
    // Se crea un middleware
    const body = req.body
    
    // Se agrega al archivo canciones.json
    canciones.push(body)

    // Se actualiza la variable canciones.json
    writeFileSync('canciones.json', JSON.stringify(canciones))

    //Enviar respuesta de que se agrego la canción
    res.json({message:'Canción agregado con éxito'})
})

// Eliminar
app.delete('/:id', (req, res) => {
    const id = req.params.id

    const canciones = JSON.parse(readFileSync('canciones.json', 'utf-8'))
    // Encuentra la posición del elemento a eliminar
    const index = canciones.findIndex( (cancion)=> cancion.id === id)
    
    // Eliminar objeto
    canciones.splice(index,1)
    // Reescribir el Json
    writeFileSync('canciones.json', JSON.stringify(canciones))
    res.json({message:'Canción eliminada con éxito'})
    // Enviar de vuelta al Front la nueva lista
    // res.json(canciones)
})

// PUT 
app.put('/:id', (req, res) => {
    // Obtener el párametro
    const {id} = req.params
    const song = req.body

    const canciones = JSON.parse(readFileSync('canciones.json', 'utf-8'))
    // Encuentra la posición del elemento a eliminar
    const index = canciones.findIndex( (cancion)=> cancion.id === id)
    // Se modifica el value del id seleccionado
    canciones[index] = song
    // Sobre escribir el archivo
    writeFileSync('canciones.json', JSON.stringify(canciones))
    // Backend message 
    res.json({message: 'Canción modificada con éxito'})
})