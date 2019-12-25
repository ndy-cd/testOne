var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var numberOfUsers = 0;
var messageCounter = 0;
var users = [];
var messages = [];
// var msgobj = {[name, message]};

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
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

