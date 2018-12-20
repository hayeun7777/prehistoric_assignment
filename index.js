var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');


app.set('view engine', 'ejs');
app.use(ejsLayouts);
//body parser middleware
app.use(express.urlencoded({extended:false}));

app.use('/dino', require('./controller/dino'));
app.use('/prehis', require('./controller/prehis'));

//home route
app.get('/', function(req, res){
	res.send("This is my home route!");
	console.log(dinoData);
})

app.listen(8000);