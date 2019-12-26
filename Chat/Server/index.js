var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var numberOfUsers = 0;
var messageCounter = 0;
var users = [];
var messages = [];
// var msgobj = {[name, message]};

// heroku >>
var port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index_client.html');
});
app.get('/index_bundle.js', function(req, res){
    res.sendFile(__dirname + '/index_bundle.js');
});

http.listen(port, function(){             // << heroku
  console.log('listening on *: ', port); 
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('update', (updmsg) => {
    console.log('update (server)' + updmsg);
    socket.emit('updRes', 'SERVER-SIDE')
  })
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
  socket.on('subscribe', function(msg){
    console.log('some user just subscribed', msg);
    socket.emit('new message', 'server-side message');
  });
  socket.on('register', function(username){
    console.log('user registered as ', username);
    socket.emit('server said', 'You logged as "' + username + '", id: ' + numberOfUsers);
    users[numberOfUsers] = {id: numberOfUsers, name: username}
    numberOfUsers++;
    console.log(users);
  });
  socket.on('newmessage', function(msgobj){
    messages.push({
      id: messageCounter, 
      name: msgobj.name, 
      message: msgobj.message
    });
    socket.broadcast.emit('bcast', messages);
    socket.emit('bcast', messages);
    console.log(messages);
    messageCounter++;
  });
});

