// const socketio = require("socket.io");
// const io = socketio(5000);

// io.on("connection", (socket) => {
//   console.log(`user connected`);
//   socket.on("message", ({ message }) => {
//     console.log(message);
//   });
// });
// console.log("LISTEN ON 5000");

const app = require("express")();
const http = require("http").Server(app);
// CORS-ийн алдааг мэдэлгүй их будиллаа
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  // res.sendFile(__dirname + '/index.html');
  res.send("<h1>server connected</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

http.listen(5000, () => {
  console.log("listening on *:5000");
});
