const mongoose = require('mongoose')

const dbuser = 'fullstack_kurssi'
const dbpassword = process.env.dbpassword || 'xxx'
const url = `mongodb://${dbuser}:${dbpassword}@ds227858.mlab.com:27858/my-mongo`

mongoose.connect(url)
mongoose.Promise = global.Promise

const Person = mongoose.model('Person', {
    name: String,
    number: String
  })

module.exports = Person