const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const OUT_DIR = path.join(__dirname, "out");

const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain",
};

const server = http.createServer((req, res) => {
  let filePath = path.join(OUT_DIR, req.url === "/" ? "index.html" : req.url);

  // If no extension, try .html
  if (!path.extname(filePath)) {
    filePath += ".html";
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Try index.html as fallback for SPA
      fs.readFile(path.join(OUT_DIR, "index.html"), (err2, data2) => {
        if (err2) {
          res.writeHead(404);
          res.end("Not Found");
          return;
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data2);
      });
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
