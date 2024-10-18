import http from "http";
import fs from "fs";

const home = fs.readFileSync("./index.html", "utf8");
const about = fs.readFileSync("./about.html", "utf8");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    return res.end(home);
  }
  if (req.url === "/about") {
    return res.end(about);
  } else {
    res.end(`<h1>404, Page not found!</h1>`);
  }
});

server.listen(4000, "localhost", () => {
  console.log("Server is running on port 4000");
});
