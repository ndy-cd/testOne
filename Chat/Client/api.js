import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');



function subscribe (cb) {
    // console.log('function works');
    socket.on('new message', (srvmsg) => cb(srvmsg));
    // socket.on('new message', srvmsg => cb(null, srvmsg));
    // socket.on('connection', message => cb(null, message));
    socket.emit('subscribe', 'initial message');
}

export { subscribe }