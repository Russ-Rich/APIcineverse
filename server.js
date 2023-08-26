const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("Hello World\n");
});

server.listen(8080, () => {
	console.log("Server running on http://localhost:8080/");
});
