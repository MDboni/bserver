import { createServer, IncomingMessage, type Server } from "http";
import { mainRouter } from "./routes/router";


const server : Server= createServer((req:IncomingMessage, res) => {
  mainRouter(req, res);
});


server.listen(3000, () => {
  console.log(`Server running at 3000`);
});