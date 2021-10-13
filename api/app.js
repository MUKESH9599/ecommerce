const express = require('express')
require('./services/db.config')
const app = express();
var bodyParser = require('body-parser')
router = require('./routes/router');
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req,res){
    res.send("hellow")
})



app.use('/', router);


app.listen(port,(req,res)=>{
    console.log(`listening on port no. ${port}`)
});