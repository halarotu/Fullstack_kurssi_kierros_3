import { Schema } from 'mongoose';

const mongoose = require('mongoose')

const dbuser = 'fullstack_kurssi'
const dbpassword = process.env.dbpassword || 'xxx'
const url = `mongodb://${dbuser}:${dbpassword}@ds227858.mlab.com:27858/my-mongo`

mongoose.connect(url)
mongoose.Promise = global.Promise

const personSchema = new Schema({
    name: String,
    number: String
  })

const Person = mongoose.model('Person', personSchema)

personSchema.statics.format = (person) => {
    return {
        name: person.name,
        number: person.number
    }
}

module.exports = Person