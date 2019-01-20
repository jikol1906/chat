//Make connection

const socket = io().emit('init');

socket.on('init',(data) => {
    data.lastMessages.forEach(
        ({message,handle}) => output.innerHTML += '<p><strong>'+handle+':</strong>'+message+'</p>')

    chatWindow.scrollTop = chatWindow.scrollHeight;
})

const message = document.getElementById('message');
const chatWindow = document.getElementById('chat-window');
const handle = document.getElementById('handle');
const send = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

send.addEventListener('click',() => {
    socket.emit('chat',{
        message:message.value,
        handle:handle.value
    })
});

message.addEventListener('keypress',() => {
    socket.emit('typing',handle.value)
});

socket.on('chat',(data) => {
    output.innerHTML += '<p><strong>'+data.handle+':</strong>'+data.message+'</p>';
    feedback.innerHTML = "";
    chatWindow.scrollTop = chatWindow.scrollHeight;
});

socket.on('typing',(data) => {
    feedback.innerHTML = '<p><em>'+data+' is typing a message...</em></p>'
    chatWindow.scrollTop = chatWindow.scrollHeight;
});
