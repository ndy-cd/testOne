import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');



function subscribe (cb) {
    socket.on('new message', (srvmsg) => cb(srvmsg));
    socket.emit('subscribe', 'initial message');
}

export { subscribe }