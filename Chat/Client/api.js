import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

function listenserver (cb) {
    console.log("ListenToServer()");
    socket.on('bcast', (obj) => cb(obj));
}

function subscribe (cb) {
    socket.emit('subscribe', 'initial message');
    socket.on('new message', (srvmsg) => cb(srvmsg));
}

function register (username, cb) {
    socket.emit('register', username);
    socket.on('server said', (srvmsg) => cb(srvmsg));
}

function sendmessage (msgobj) {
    socket.emit('newmessage', msgobj);
}


export { subscribe, register, sendmessage, listenserver }