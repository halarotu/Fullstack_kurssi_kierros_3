const mongoose = require('mongoose')

const dbuser = 'fullstack_kurssi'
const dbpassword = process.env.dbpassword || 'xxx'
const url = `mongodb://${dbuser}:${dbpassword}@ds227858.mlab.com:27858/my-mongo`

const Schema = mongoose.Schema
mongoose.connect(url)
mongoose.Promise = global.Promise

const personSchema = new Schema({
    name: String,
    number: String,
    id: String
  })

personSchema.statics.format = function(person) {
    return {
        name: person.name,
        number: person.number,
        id: person.id
    }
}

const Person = mongoose.model('Person', personSchema)


module.exports = Person