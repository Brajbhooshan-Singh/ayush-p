require('dotenv').config
const mongoose = require('mongoose');

async function connection(){
    const url = process.env.URL;

    const connectionParams={
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
    mongoose.connect(url,connectionParams)
        .then( () => {
            console.log('Mongo Database Connection has been established successfully!')
        })
        .catch( (err) => {
            console.error(`Error connecting to the database. n${err}`);
        })
}

module.exports = connection;