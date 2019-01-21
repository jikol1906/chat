const jsonReader = require('jsonfile')

const storeMessage = require('./storeMessages');
const express = require('express');
const socket = require('socket.io');


const app = express();

const server = app.listen(process.env.PORT || '4000',() => {
    'listening on port 4000'
});

app.use(express.static('public'));

const io = socket(server);

io.on('connection',(socket) => {

    socket.on('chat', (data) => {

        storeMessage(data);

        console.log('done');

        io.sockets.emit('chat',data)
    });


    socket.on('typing',(data) => {
        socket.broadcast.emit('typing',data)
    })

    socket.on('init',() => {

        jsonReader.readFile(__dirname + '/messages.json')
            .then(lastMessages => socket.emit('init',lastMessages))
            .catch(err =>  console.log(err))

    })


});
