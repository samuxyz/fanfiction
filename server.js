var express = require('express');
var port = 3000;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

//Log with Morgan
app.use(morgan('dev'));

//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

//configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

//array to temporary store docs
var fanfictionList = [
	{ id: 0, title: "Molten Blast", author:"Joseph Palumbo", genre:"scifi", words: 9408, reviews: 2, published: "2016/02/2", updated: "2016/04/01", url: "https://cdn.filepicker.io/api/file/YB4n8NxDTpOwa7kgkw2u"},	
	{ id: 1, title: "Clash of the Predator", author:"Pat Matthews", genre:"scifi" words: 7900, reviews: 7, published: "2016/06/07", updated: "2016/06/10", url: "https://cdn.filepicker.io/api/file/YB4n8NxDTpOwa7kgkw2u" },
	{ id: 2, title: "X44 Explode", author:"Bethany Stachenfeld", genre:"scifi" words: 2789, reviews: 5, published: "2016/04/30", updated: "2016/05/20", url: "https://cdn.filepicker.io/api/file/YB4n8NxDTpOwa7kgkw2u" },
	{ id: 3, title: "Base of the Titan", author:"Samuele Zaza", genre:"scifi" words: 3408, reviews: 10, published: "2016/06/15", updated: "2016/06/22", url: "https://cdn.filepicker.io/api/file/YB4n8NxDTpOwa7kgkw2u" }	
];


app.route('/fanfiction')
	.get(function(req, res){
		var fanfictionListReverse = fanfictionList.slice();
		res.json(fanfictionListReverse.reverse());
	})
	.post(function(req, res){
		var date = new Date();
		var today = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
		var fanfiction = {
			id : fanfictionList.length,
			title: req.body.title,
			author: req.body.author,
			genre: req.body.genre,
			words: parseInt(Math.random() * 9000 + 1000),
			reviews: 0,
			published: today,
			updated: today,
			url: req.body.url
		};
		fanfictionList = fanfictionList.concat([fanfiction]);
		res.json({ message: "Successfully added!"});	
	});
app.listen(port);
console.log('listening on port ' + port);