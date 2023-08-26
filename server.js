// Import necessary modules
const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

// Create HTTP server
const server = http.createServer((request, response) => {
	// Parse the URL
	const parsedUrl = url.parse(request.url, true);

	// Log the request
	fs.appendFile("log.txt", `${new Date().toISOString()} - ${parsedUrl.pathname}\n`, (err) => {
		if (err) throw err;
	});

	// Handle /documentation path
	if (parsedUrl.pathname.includes("documentation")) {
		fs.readFile(path.join(__dirname, "documentation.html"), "utf8", (err, data) => {
			if (err) {
				response.writeHead(404, { "Content-Type": "text/plain" });
				response.write("404 Not Found\n");
				response.end();
				return;
			}
			response.writeHead(200, { "Content-Type": "text/html" });
			response.write(data);
			response.end();
		});
	} else {
		// Handle other paths
		fs.readFile(path.join(__dirname, "index.html"), "utf8", (err, data) => {
			if (err) {
				response.writeHead(404, { "Content-Type": "text/plain" });
				response.write("404 Not Found\n");
				response.end();
				return;
			}
			response.writeHead(200, { "Content-Type": "text/html" });
			response.write(data);
			response.end();
		});
	}
});

// Listen on port 8080
server.listen(8080, () => {
	console.log("Server running on http://localhost:8080/");
});
