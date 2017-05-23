var express = require('express');
var app = express();
var path = require('path');

// location of public files
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/monica-torralba-resume', function(req, res) {
	res.sendFile(path.join(__dirname, 'public', 'Monica_Torralba_Resume.pdf'));
})

app.listen(process.env.PORT || 3000, function() {
	console.log('Started Mica\'s website on port', process.env.PORT || 3000, '!!!');
});