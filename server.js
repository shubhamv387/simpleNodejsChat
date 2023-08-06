const http = require("http");
const routes = require("./routes");

//case 1
// const server = http.createServer(routes);

//case 2 - case 3 - case 4
const server = http.createServer(routes.handeler);
console.log(routes.someText);

server.listen(3000);
