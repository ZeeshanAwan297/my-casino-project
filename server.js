const { createServer } = require("http");
const next = require("next");

const { initSocket } = require("./app/lib/socket");
const { startGameLoop } = require("./app/lib/crashEngine");

const app = next({ dev: true });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handler(req, res);
  });

  const io = initSocket(server);

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
  });

  server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");

    // 🔥 VERY IMPORTANT (GAME START)
    setTimeout(() => {
      startGameLoop();
      console.log("Crash game started");
    }, 2000);
  });
});