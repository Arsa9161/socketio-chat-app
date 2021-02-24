
const app = require("express")();
const http = require("http").Server(app);
// CORS-ийн алдааг мэдэлгүй их будиллаа
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log("a user connected");
  
  socket.emit('your id', socket.id)

  socket.on('message', (msg) => {
    console.log(msg)
    io.emit('message', msg);
  });
});

http.listen(5000, () => {
  console.log("listening on *:5000");
});
