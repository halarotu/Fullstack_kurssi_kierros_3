const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))

app.use(bodyParser.json())
morgan.token('body', function(req, res) { return JSON.stringify(req.body); })
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.body(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  }))


let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
      },
      {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
      },
      {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
      },
      {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
      }
]

// not in use anymore
/*const formatData = (person) => {
    return {
      name: person.name,
      number: person.number
    }
}*/

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(persons => {
            res.json(persons.map(Person.format))
        })
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log(id)
    const person = persons.find(p => p.id === id)

    if ( person ) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    Person
        .findByIdAndRemove(id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => {
            res.status(400).send({ error: 'malformatted id' })
        })
})

app.post('/api/persons', (req, res) => {
    //const id = Math.round((Math.random() * 10000))
    const body = req.body
    
    if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({error: 'name or number missing'})
    }

    const sameName = persons.find(p => p.name === body.name)
    if( sameName ){
        return res.status(400).json({error: 'name must be unique'})
    }

    const person = new Person({
        name: body.name,
        number: body.number
      })

    person
        .save()
        .then(savedPerson => {
            res.json(Person.format(savedPerson))
      })
})

app.get('/info', (req, res) => {
    const date = new Date()
    const count = persons.length
    res.send(`<div><p>Puhelinluettelossa on ${count} henkilön tiedot</p> <p>${date}</p></div>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})