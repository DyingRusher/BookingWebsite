const express = require("express");
const User = require("./models/User.js");
const app = express();
const bcrypt = require("bcryptjs"); // for encryption
const cors = require("cors"); // for cammunication between ports
const mongoose = require("mongoose");

require("dotenv").config(); // FOR PROPER WORKING OF ENV

const dbconnect = async () => {
  await mongoose.connect(process.env.MONGOOSE_URL).then(
    () => {
      console.info(`Connected to database`);
    },
    (error) => {
      console.error(`Connection error: ${error.stack}`);
      process.exit(1);
    }
  );
};
dbconnect()
  .then((res) => {
    console.log(res);
  })
  .catch((res) => {
    console.log(res);
  });

app.use(express.json()); // for parsing json
app.use(
  cors({
    credentails: true,
    origin: "http://localhost:5173",
  })
);

// console.log(process.env.MONGOOSE_URL);

app.get("/test", (req, res) => {
  res.json("done");
});

const secret = bcrypt.genSaltSync(8);

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  //   res.json({ name, email, password }); //it will give error
  const user = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, secret),
  });

  res.json(user);
});

app.listen(6969);
