// create server
const http = require("http");
const fs = require("fs");
const path = require("path");   

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/task") {
    let body = "";  
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const newtask = JSON.parse(body); // data complete    
        const filepath = path.join(__dirname, "task.json");  // path define 
        fs.readFile(filepath, "utf8", (err, data) => { 
          const task = data ? JSON.parse(data) : [];
          newtask.id = task.length + 1;  // id 
          task.push(newtask);
            fs.writeFile(filepath, JSON.stringify(task, null, 2), (err) => {
                res.writeHead(201, { "content-type": "application/json" });
                res.end(JSON.stringify(newtask));
            });
        });
    });
  } 
});
server.listen(3000, () => {
  console.log("Server running on port 3000");
});