const mongoose = require('mongoose')

const dbuser = 'fullstack_kurssi'
const dbpassword = 'xxx'
const url = `mongodb://${dbuser}:${dbpassword}@ds227858.mlab.com:27858/my-mongo`

mongoose.connect(url)
mongoose.Promise = global.Promise;

const Person = mongoose.model('Person', {
  name: String,
  number: String
})
const args = process.argv

if (args.length === 2) {
    console.log('puhelinluettelo:')
    Person
        .find({})
        .then(result => {
            result.forEach(p => {
                console.log(`${p.name} ${p.number}`)
            })
        mongoose.connection.close()
        })
} 
else if (args.length === 4) {
    const person = new Person({
        name: args[2],
        number: args[3]
    })
    
    console.log(`lisätään henkilö ${person.name} numero ${person.number} luetteloon`)
    person
        .save()
        .then(response => {
            mongoose.connection.close()
        })
}
else {
    mongoose.connection.close()
}

