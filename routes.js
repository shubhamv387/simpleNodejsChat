const fs = require("fs");

const requestHandeler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    fs.readFile("message.txt", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      }
      // console.log("printing " + data);
      res.write("<html>");
      res.write("<head><title>Enter Message</title></head>");
      res.write(`<body>${data}</body>`);
      res.write(
        "<body><form action='/message' method='POST'> <input type='text' name='message'/><button type='submit'> Send</button> </form> </body>"
      );
      res.write("</html>");
      return res.end();
    });
  } else if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunck) => {
      body.push(chunck);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><h1>Hello from Node Js Server!</h1> </body>");
    res.write("</html>");
    return res.end();
  }
};

//case 1
// module.exports = requestHandeler;

//case 2
// module.exports = {
//   handeler: requestHandeler,
//   someText: "Hard Coded Some Text",
// };

//case 3
// module.exports.handeler = requestHandeler;
// module.exports.someText = "Hard Coded Some Text";

//case4
exports.handeler = requestHandeler;
exports.someText = "Hard Coded Some Text";
