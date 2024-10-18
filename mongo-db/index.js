import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/mongolearn")
  .then(() => {
    console.log("Connected to mongodb successfully!");
  })
  .catch((err) => {
    console.log("Failed to connect to mongodb", err);
  });

// after setup DB connection we have to define Schema

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  logedin: Boolean,
});

// now we are creating `model` like collection of database OK!
// -----------------------------------------------------------------
const User = new mongoose.model("User", userSchema);
/*
const addUser = async () => {
  const newUser = new User({
    name: "kaushal",
    email: "kaushal@gmail.com",
    logedin: true,
  });

  await newUser.save(); // save data in database
};
// -----------------------------------------------------------------

// now we are calling function to add user in database
addUser();
*/

// the above code best way to write is using async/await

/*
const addUser = async () => {
  const newUser = await User.create({
    name: "Ram",
    email: "Ram@gmail.com",
    logedin: true,
  });
};

addUser();
*/

// another way to add data -----------------------------------------------------------------

/*
const addUser = async () => {
  try {
    const email = "ramam@gmail.com";

    // checking if user already exist
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      console.log("user already exist");
    } else {
      await User.create({
        name: "ramam",
        email: email,
        logedin: true,
      });
      console.log("User added successfully!");
    }
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

addUser();
*/
// get more Query Selectors ideas here: https://www.mongodb.com/docs/manual/reference/operator/query/

// like : $eq, $gt, $in

const findUser = async () => {
  const newUser = await User.find({ name: { $in: ["ram", "ramam"] } });
  console.log(newUser);
};

findUser();
