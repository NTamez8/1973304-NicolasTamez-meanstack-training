const app = require('express')();
const mongoose = require('mongoose');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Chat = require('./chatModel');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/chatLog',{useNewUrlParser:true,useUnifiedTopology: true});

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

io.on('connection',(socket)=>{
    console.log('conneted');
    socket.on('message sent',(msg,name)=>{
        console.log('Hello ' + name + '\nYour message is ' + msg);
        SaveMessage(name,msg);
    })
})

http.listen(8080,()=>console.log('listening on port 8080'));

async function SaveMessage(userName,msg)
{
    let chat = new Chat();
    chat.name = userName;
    chat.message = msg;
    await chat.save();
}
