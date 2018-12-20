var express = require('express');
var router = express.Router();
var fs = require('fs'); //access to file system
var preHisData = fs.readFileSync('prehistoric_creatures.json');
preHisData= JSON.parse(preHisData);

router.get('/', function(req, res){
	var typeFilter = req.query.typeFilter;
	if(typeFilter){
		var filteredData = preHisData.filter(function(prehis){
			return prehis.type.toLowerCase() === typeFilter.toLowerCase();
		});
		res.render('index', {myData: filteredData});
	} else{
		res.render('index', {myData: preHisData});
	}
})

//dino new route (put this on top of show route)
router.get('/new', function(req,res){
	res.render('prehis/new');
})

//dino show route
router.get('/:idx', function(req, res){
	if(req.params.idx<preHisData.length+1){
		res.render('prehis/show', {creature: preHisData[req.params.idx-1]});
	} else{
		res.send("we have no DATA");
	}
})

//new dino post route
router.post('/', function(req, res){
	//add new dino to our array
	preHisData.push(req.body);

	//save new dino to our json file
	fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(preHisData));

	//redirect to the GET / dinosaurs route (index)
	res.redirect('/prehis');
});

router.get('/edit/:idx', function(req, res){
	res.render('prehis/edit', {creature: preHisData[req.params.idx], id: req.params.idx});
})

module.exports = router;
