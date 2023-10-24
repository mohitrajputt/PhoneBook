const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Phonebook');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to db ->> '));


db.once('open',function(){
    console.log('succesfully connected to the database');
});

// Note: if it's failed to connect then check mongodb is running [ to check go task services .]














