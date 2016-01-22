var express = require('express');
var app = express();
var path = require('path'); 
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var Controllers = require('./controllers');
var api = require('./services/api');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));
app.use(cookieParser())
app.use(session({
	secret:'chatting',
	resave:true,
	saveUninitialized:false,
	cookie:{
		maxAge:60*1000
	}
}))

app.use(express.static(path.join(__dirname,'static')));
app.use(function(req,res){
	res.sendFile(path.join(__dirname,'./static/index.html'));
});

app.post('/api/login', api.login);
app.get('/api/logout', api.logout);
app.get('/api/validate', api.validate);

var server = app.listen(port,function(){
	console.log('chattingroom is on port '+ port + '!');
});

var io = require('socket.io').listen(server);

var messages = [];
io.sockets.on('connection',function(socket){

	socket.on('getAllMessages',function(){
		socket.emit('allMessages',messages);
	});

	socket.on('createMessage',function(message){
		messages.push(message);
		io.sockets.emit('messageAdded',message);
	});
});

