var express = require('express');
var app = express();
var path = require('path');
var fetch = require('node-fetch');

function getDog() {
	return new Promise((resolve, reject) => {
	  fetch("https://random.dog/woof")
		.then((res) => res.text())
		.then(dog => resolve(`https://random.dog/${dog.includes(".mp4") ? "8536-28743-5665.jpg" : dog}`))
	  .catch(err => reject(Error(err)));
	});
}

function getCat() {
	return new Promise((resolve, reject) => {
	  fetch("https://random.cat/meow")
		.then((res) => res.json())
		.then(cat => resolve(cat.file))
	  .catch(err => reject(Error(err)));
	});
}

function getRandomAnimal() {
	return Math.random() < .5 ? getDog() : getCat();
}

// location of public files
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/monica-torralba-resume', function(req, res) {
	res.sendFile(path.join(__dirname, 'public', 'Monica_Torralba_Resume.pdf'));
});

app.get('/animals', function(req, res) {
	res.sendFile(path.join(__dirname, 'animals.html'));
});

app.get('/api/random-animal', function(req, res) {
	getRandomAnimal()
	.then(function(url) {
		res.send(url);
	})
	.catch(function(err) {
		res.status(404).json(err);
	})
});

app.listen(process.env.PORT || 3000, function() {
	console.log('Started Mica\'s website on port', process.env.PORT || 3000, '!!!');
});
