const express = require('express')
const cors = require('cors')

//middleware
const logger = require('./loggerMiddleware')

//data
let notes = require('./data/notes')
let users = require('./data/users')

//index package
const homePage = require('./home')

const app = express()
app.use(cors()) //por defecto admite que cualquier origen pueda usar nuestra API
app.use(express.json()) //soporta las request en las que se pasa un objeto y las parsea

app.use(logger)


app.get('/', (req, res) => {
    res.send(homePage)
})

// USERS
app.get('/api/users', (req,res) => {
    res.send(users)
})

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(user => user.id === id)
    if(user){
        res.json(user)
    }else{
        res.status(404).end()
    }
})

app.post('/api/users', (req, res) => {
    const user = req.body
    
    if(!user){
        return res.status(400).json({
            error: 'note.content is missing'
        })
    }

    const ids = users.map(user => user.id)
    const maxId = Math.max(...ids)

    const newUser = {
        id: maxId + 1,
        username: user.username,
        email: user.email,
        password: user.password,
    }

    users = [...users, newUser]

    res.status(201).json(newUser) //201 created
})

app.put('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const indexOfUser = users.map(user => user.id).indexOf(id)
    const user = req.body
    console.log(users[indexOfUser])

    if(indexOfUser===-1){
        return res.status(400).json({
            error: 'note.content is missing'
        })
    }

    users[indexOfUser].username = user.username
    users[indexOfUser].email = user.email
    users[indexOfUser].password = user.password

    res.status(201).json(users[indexOfUser]) //201 created
})

app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    users = users.filter(user => user.id !== id)
    res.status(204).end()
})


//NOTES

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
