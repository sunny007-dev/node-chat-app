const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

const server = http.createServer(app);

const {Server} = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
    socket.on('user-message', (message) => {
        console.log('A new user message', message);
        io.emit('message', message);
    })
})

app.use(express.static(path.resolve("./public")));

app.get("/", (req,res) => {
    return res.sendFile("/public/index.html");
})



server.listen(9000, () => console.log("Server start at port 9000"));