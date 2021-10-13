const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/x-store');

mongoose.connection.once('open', function (){
    console.log('connection is successful');
})