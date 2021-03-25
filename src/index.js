const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
// CONECTION TO THE DB
// mongoose.connect('mongodb://localhost/db_mevn', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(db => console.log('DB is connected'))
//     .catch(err => console.error(err));
mongoose.connect("mongodb://localhost/db_mevn", {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(db => console.log('DB is connected'));

//ERROR CONECTION DB MONGODB
mongoose.connection.on("error", function(error){
    console.log("Error conectandose a MongoDB", error);
    process.exit(1);
});

//SETTING
app.set('port', process.env.PORT || 3000);

// MiDDLEWARE
app.use(morgan('dev'));
app.use(express.json());

// ROUTES
app.use('/api/tasks', require('./routes/tasks'));

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// SERVER IS LISTENNING
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});