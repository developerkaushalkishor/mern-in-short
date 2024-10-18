// *Important Links*: Must VISIT

// *Understanding async and await*: https://chatgpt.com/share/670d45d7-98c8-8006-9e01-437cfc6e5d58
// *Understanding MongoDB*: https://chatgpt.com/share/670d45f7-dd48-8006-836a-c87005c2b231

// server.js
const express = require("express"); // framework that help us build web applications
const mongoose = require("mongoose"); // database library to interact with MongoDB
const cors = require("cors"); // middleware to enable CORS (Cross-Origin Resource Sharing) allow requests from different domains
const bodyParser = require("body-parser"); // middleware to parse JSON data from the request body

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // using cors to enable CORS to talk with frontend
app.use(bodyParser.json()); // using bodyParser to parse JSON data from the request body

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/messageDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Create a Message Schema || before adding data in DB we have to define schema always in react app

const messageSchema = new mongoose.Schema({
  content: String,
});

const Message = mongoose.model("Message", messageSchema); // models be like collections in MongoDB

// Routes for CRUD operations

// here we using async, await because of Asynchronous Nature of Database Operations : for more info visit the given link
app.post("/messages", async (req, res) => {
  // if we mark function as `async` it will always returns a Promise and allows us to use `await` keyword inside it
  const message = new Message(req.body);
  await message.save(); // await tells JS to wait until the Promise is resolved before moving to the next line of code.
  res.send(message); // send the saved message shows to the client/frontend page
});

app.get("/messages", async (req, res) => {
  const messages = await Message.find();
  res.send(messages);
});

app.put("/messages/:id", async (req, res) => {
  const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(message);
});

app.delete("/messages/:id", async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.send({ message: "Message deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
