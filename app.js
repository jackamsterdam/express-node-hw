const express = require('express')
const path = require('path')
const fs = require('fs')
    // const uuid = require('uuid')

const app = express()

//body parser:
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ex 1    http://localhost:3000
// app.get('/', (req, res) => {
//     res.send('This text returned from my node.js server')
// })

//ex 2   http://localhost:3000/1978
// app.get('/:birthdate', (req, res) => {
//     console.log('req.params', req.params) //{ birthdate: 'favicon.ico' } ???
//     console.log('req.params.birthdate', req.params.birthdate) //favicon.ico  ???
//     res.send(`You were born in ${req.params.birthdate}`)
// })

//ex 3    http://localhost:3000?num1=23&num2=12
// app.get('/', (req, res) => {
//     console.log('req.query', req.query)

//     let num1 = +req.query.num1
//     let num2 = +req.query.num2

//     let result = num1 + num2 //should I be doing heavy math computations in node.js? Where should this code go?

//     res.json(result)
// })

// ex 4
app.get('/', (req, res) => {
        const fileFullName = path.join(__dirname, './index.html')
        res.sendFile(fileFullName)
    })
    //? css doesnt work:
    // app.get('/', (req, res) => {
    //     const fileFullName = path.join(__dirname, './style.css')
    //     res.sendFile(fileFullName)
    // })

//Create a new Member CRUD Create POST
const personsArray = []
app.post('/persons', (req, res) => {
    console.log('req.body', req.body) //req.body { id: '3', firstName: 'Jack', lastName: 'Amsterdam' }
    console.log('personsArray', personsArray)

    if (!req.body.id || !req.body.firstName || !req.body.lastName) {
        return res.status(400).json({ msg: 'Please fill out all fields' })
    }
    personsArray.push(req.body)
    console.log('personsArrayAfterPush', personsArray)
    debugger
    res.json({ msg: 'user added' })
})

//Get Single Member
app.get('/persons/:id', (req, res) => {
    console.log('req.params', req.params)
    console.log('req.params.id', req.params.id)
        // debugger
    const found = personsArray.some(person => person.id === req.params.id)
        // debugger
    if (found) {
        console.log('found', found) //find or filter
        let person = personsArray.find(person => person.id === req.params.id)
        res.json(person)
            // debugger
    } else {
        res.status(400).json({ message: `The person with id ${req.params.id} doesn't exist` })
    }
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => { console.log(`Listening with nodemon on port ${PORT}...`) })