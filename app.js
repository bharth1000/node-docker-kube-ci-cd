const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello from Node.js App with CI/CD 🚀");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
