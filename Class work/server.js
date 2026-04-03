const http = require("http");
const fs = require("fs");
const { URL } = require("url");

// read json file
const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

const server = http.createServer((req, res) => {

  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const pathname = urlObj.pathname;
  const id = parseInt(urlObj.searchParams.get("id"));

  if (req.method === "GET" && pathname === "/data") {

    const result = data.find(item => item.id === id);

    if (result) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Data not found" }));
    }

  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }

});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});