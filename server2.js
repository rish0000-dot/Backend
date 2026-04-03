const http = require("http");

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("This is a GET request response");
    }

    else if (req.method === "POST" && req.url === "/data") {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                message: "POST request received",
                data: body
            }));
        });
    }

    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Route not found");
    }

});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});