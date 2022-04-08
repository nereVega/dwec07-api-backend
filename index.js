const express = require('express')
const cors = require('cors')

//middleware
const logger = require('./loggerMiddleware')

//data
let notes = require('./data/notes')

//index package
const homePage = require('./home')

const app = express()
app.use(cors()) //por defecto admite que cualquier origen pueda usar nuestra API
app.use(express.json()) //soporta las request en las que se pasa un objeto y las parsea

app.use(logger)


app.get('/', (req, res) => {
    res.send(homePage)
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    if(note){
        res.json(note)
    }else{
        res.status(404).end()
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
    const note = req.body
    
    if(!note || !note.content){
        return res.status(400).json({
            error: 'note.content is missing'
        })
    }

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }

    notes = [...notes, newNote]

    res.status(201).json(newNote) //201 created
})

//Controlar rutas incorrectas
app.use((req,res) => {
    console.log(req.path)
    res.status(404).json({
        error: 'Not Found'
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
