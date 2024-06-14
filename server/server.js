const app = require("./app");
const PORT = 3001;
const http = require("http");

const server = http.createServer(app);

async function startServer() {
  server.listen(PORT, () => {
    console.log(`Initializing the server on PORT : ${PORT} `);
  });
}

startServer();
