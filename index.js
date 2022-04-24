const express = require('express')
const cors = require('cors')

//middleware
const logger = require('./loggerMiddleware')

//data
// let notes = require('./data/notes')
let users = require('./data/users')
let boards = require('./data/boards')

//index package
const APIhomePage = require('./home')

const app = express()
app.use(cors()) //por defecto admite que cualquier origen pueda usar nuestra API
app.use(express.json()) //soporta las request en las que se pasa un objeto y las parsea

app.use(logger)


app.get('/', (req, res) => {
    res.send(APIhomePage)
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
    const reqId = Number(req.params.id)
    const indexOfUser = users.map(user => user.id).indexOf(reqId)
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

////////////////////////////////////////////////////////////////////


//BOARDS
app.get('/api/boards', (req,res) => {
    console.log(req)
    res.send(boards)
})

app.get('/api/boards/:id', (req,res) => {
    const id = Number(req.params.id)
    const board = boards.find(board => board.id === id)
    if(board) {
        res.json(board)
    }
    else {
        res.status(404).end()
    }
})

app.post('/api/boards', (req,res) => {
    const board = req.body  //solo contiene ownerID y titulo

    const ids = boards.map(board => board.id)
    const maxId = Math.max(...ids)

    const newBoard = {
        id: maxId+1,
        titulo: board.titulo,
        owner: board.owner,
        toDoList: [],
        doingList: [],
        doneList: []
    }

    boards = [...boards,newBoard]

    res.status(201).json(newBoard)
})

app.put('/api/boards', (req,res) => {
    const newItem = req.body   // contiene board.id, board.titulo y content
    const boardIndex = Number(boards.map(board => board.id).indexOf(newItem.boardId))

    if (boardIndex === -1) res.status(401).end()
    
    if (newItem.titulo !== 'Undefined') boards[boardIndex].titulo = newItem.titulo
    if (newItem.content !== 'undefined') boards[boardIndex].toDoList = [...boards[boardIndex].toDoList, newItem.content]

    res.status(201).json(newItem)
})

app.delete('/api/boards/:id', (req,res) => {
    const id = Number(req.params.id)
    boards = boards.filter(board => board.id !== id)

    res.status(204).end()
})


//     const newNote = {
//         id: maxId + 1,
//         content: note.content,
//         important: typeof note.important !== 'undefined' ? note.important : false,
//         date: new Date().toISOString()
//     }


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
