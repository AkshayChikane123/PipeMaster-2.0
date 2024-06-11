const mongoose = require('mongoose');

// PipeMaster_development as it is development envir
mongoose.connect('mongodb://localhost/PipeMaster_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function () {
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;

