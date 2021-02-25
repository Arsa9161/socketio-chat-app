const app = require("express")();
const http = require("http").Server(app);
// CORS-ийн алдааг мэдэлгүй их будиллаа
/**
 * cors-ийн тохиргоог дамжууллаа
 */
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
/**
 * socket connection listener
 */
io.on("connection", (socket) => {
  console.log("a user connected");
  // холбогдсон socekt-руу түүний id-г илгээнэ
  socket.emit("your id", socket.id);

  // socekt message event
  socket.on("message", (msg) => {
    io.emit("message", msg);
  });
});

http.listen(5000, () => {
  console.log("listening on *:5000");
});
