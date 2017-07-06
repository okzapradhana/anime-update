const express = require('express');
const routes = require('./routes/index');

const app = express();

app.use('/api', routes);

app.get('/', function(req, res){
    res.send('index');
})

app.listen(process.env.port || 3232, function(){
    console.log('race on port 3232');
})