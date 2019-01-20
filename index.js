
const jsonReader = require('jsonfile');
const express = require('express');
const socket = require('socket.io');
const fs = require('fs');

const app = express();

const server = app.listen(process.env.PORT || '4000',() => {
    'listening on port 4000'
});

app.use(express.static('public'));

const io = socket(server);

io.on('connection',(socket) => {

    socket.on('chat', (data) => {

        jsonReader.readFile(__dirname + '/messages.json')
            .then(({lastMessages}) => {

                console.log(lastMessages.length);

                if(lastMessages.length >= 20) {
                    lastMessages.shift();
                }

                lastMessages.push(data);

                jsonReader.writeFile(__dirname + '/messages.json',{lastMessages})
                    .then(res => console.log('complete'))
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error));


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
