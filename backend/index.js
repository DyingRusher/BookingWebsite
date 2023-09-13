const express = require("express");
const User = require("./models/User.js");
const app = express();
const jet = require('jsonwebtoken')
const bcrypt = require("bcryptjs"); // for encryption
const cors = require("cors"); // for cammunication between ports
const mongoose = require("mongoose");
require("dotenv").config(); // FOR PROPER WORKING OF ENV

const dbconnect = async () => {
  await mongoose.connect(process.env.MONGOOSE_URL).then(
    () => {
      console.log(`Connected to database`);
    },
    (error) => {
      console.error(`Connection error: ${error.stack}`);
      process.exit(1);
    }
    );
  };

dbconnect()
.then((res) => {
  // console.log(res);
})
.catch((res) => {
  console.log(res);
});

const jetDash ='jetIsSecondGrestetDualist'
app.use(express.json()); // for parsing json
// app.use(
//   cors({
//     credentails: true,
//     origin: "http://localhost:5173",
//   })
// );
const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (e.g., cookies) to be sent with the request
};

app.use(cors(corsOptions));
// console.log(process.env.MONGOOSE_URL);

app.get("/test", (req, res) => {
  res.json("done");
});

const secret = bcrypt.genSaltSync(8);

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  //   res.json({ name, email, password }); //it will give error
  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, secret),
    });
    res.json(user);
    user.save()
    
  }catch(er){
    res.status(422).json(er)
  }
  
  
});


app.post('/login',async (req,res)=>{
  // req.header['Access-Control-Allow-Credentials'] = tr ue
  const {email,password} = req.body;
  try{
  const userdoc = await  User.findOne({email})
  if(userdoc){
    // res.json('found')
    const pass = bcrypt.compareSync(password,userdoc.password)
    
    if(pass){
      // res.json('nice')
      const token = await jet.sign({email:userdoc.email,id:userdoc._id},jetDash,{})
        // res.header('Access-Control-Allow-Credentials','tr  ue')
        // res.header('Access-Control-Allow-Origin','*')
        // res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.cookie('token',token,{sameSite:'none',secure:true}).json('right pass')  // but this will not save cookie in host 5173 so to do it see in loginpage
        console.log(token) 
    }else{
      res.json('not nice')
    }
  }else{
    res.json('not found')
  }
  }catch(er){
    return res.status(422).json(er)
  }
})

app.listen(6969);
