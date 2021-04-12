const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

io.on('connection',(socket)=>{
    console.log('conneted');
    socket.on('message sent',(msg,name)=>{
        console.log('Hello ' + name + '\nYour message is ' + msg);
    })
})

http.listen(8080,()=>console.log('listening on port 8080'));
