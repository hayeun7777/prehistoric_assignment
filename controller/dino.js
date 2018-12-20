var express = require('express');
var router = express.Router();
var fs = require('fs'); //access to file system
var dinoData = fs.readFileSync('./dinosaurs.json');
dinoData = JSON.parse(dinoData);

router.get('/', function(req, res){
	var nameFilter = req.query.nameFilter;
	if(nameFilter){
		var filteredData = dinoData.filter(function(dino){
			return dino.name.toLowerCase() === nameFilter.toLowerCase();
		});
		res.render('index', {myData: filteredData});
	} else{
		res.render('index', {myData: dinoData});
	}
})

//dino new route (put this on top of show route)
router.get('/new', function(req,res){
	res.render('dino/new');
})

//dino show route
router.get('/:idx', function(req, res){
	if(req.params.idx<dinoData.length+1){
		res.render('dino/show', {creature:dinoData[req.params.idx-1]});
	} else{
		res.send("we only have " + dinoData.length + " dinos at this time");
	}
})

//new dino post route
router.post('/', function(req, res){
	//add new dino to our array
	dinoData.push(req.body);

	//save new dino to our json file
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));

	//redirect to the GET / dinosaurs route (index)
	res.redirect('/');
});

router.get('/edit/:idx', function(req, res){
	res.render('dino/edit', {creature: preHisData[req.params.idx]});
})

module.exports = router;
