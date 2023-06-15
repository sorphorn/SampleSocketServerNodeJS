const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

// Serve static files from the "public" directory
app.use(express.static('public'));

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle 'chat message' event
  socket.on('chat message', (message) => {
    console.log('Received message:', message);
    io.emit('chat message', message); // Broadcast the message to all connected clients
  });

  // Handle 'disconnect' event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Socket.IO server listening on port ${port}`);
});
