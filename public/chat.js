//Make connection

const socket = io().emit('init');

socket.on('init',(data) => {
    data.lastMessages.forEach(
        ({message,handle}) => output.innerHTML += '<p><strong>'+handle+':</strong>'+message+' :0)</p>')

    chatWindow.scrollTop = chatWindow.scrollHeight;
})

const message = document.getElementById('message');
const chatWindow = document.getElementById('chat-window');
const handle = document.getElementById('handle');
const send = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');


$('#mspin').click(() => {

    const img = $('#mspin-img');

    if(img.hasClass('move')) {
        img.removeClass('move')

    } else {
        img.addClass('move')
    }
});


$("#message").on('keyup', function (e) {

    const key = e.which || e.keyCode || 0;

    if (key === 13) {
        sendMsg();
    }
});

send.addEventListener('click',() => {
    sendMsg();
});

function sendMsg() {
    const removeStyleTag = message.value
        .replace('<style>','')
        .replace('</style>','')

    socket.emit('chat',{
        message:message.value.replace('<style>','').replace('</style>',''),
        handle:handle.value
    })

    message.value = '';
}

message.addEventListener('keypress',() => {
    socket.emit('typing',handle.value)
});

socket.on('chat',(data) => {
    output.innerHTML += '<p><strong>'+data.handle+':</strong>'+data.message+' :0)</p>';
    feedback.innerHTML = "";
    chatWindow.scrollTop = chatWindow.scrollHeight;
});

socket.on('typing',(data) => {
    feedback.innerHTML = '<p><em>'+data+' is typing a message...</em></p>'
    chatWindow.scrollTop = chatWindow.scrollHeight;
});
