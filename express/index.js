import express from "express";
import { fileURLToPath } from "url"; //  Import the fileURLToPath function from the url module for  use in the __dirname variable to  get the absolute path of the current directory.

import { dirname, join } from "path"; //  Import the dirname and join functions from the path module for use in the __dirname variable to get the absolute path of the current directory.

import bodyParser from "body-parser"; // for parsing the request body 

import router from "./routers.js";

const app = express();
const port = 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1/", router);

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req, res) => {
  const indexPath = join(__dirname, "index.html");
  res.sendFile(indexPath);
});

app.post("/api/v1/login", (req, res) => {
  res.send(`Hello, ${req.body.name} you are successfully logged in.`);
});

app.get("/api/v1/userdata", (req, res) => {
  res.json({
    name: "Kaushal Kishor",
    email: "kaushalkishor97200@gmail.com",
    password: "hexed",
    address: {
      street: "123, ABC Street",
      country: "India",
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
