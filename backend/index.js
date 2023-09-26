const express = require("express");
const User = require("./models/User.js");
const app = express();
const jet = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // for encryption
const Place = require("./models/Place.js");
const cors = require("cors"); // for cammunication between ports
const mongoose = require("mongoose");
const cookirParser = require("cookie-parser");
const imageDown = require("image-downloader");
const multer = require("multer");
const fs = require("fs"); //file system
require("dotenv").config(); // FOR PROPER WORKING OF ENV

app.use(cookirParser());

app.use("/uploads", express.static(__dirname + "/uploads"));

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

const jetDash = "sdfsdfsfd";
app.use(express.json()); // for parsing json
// app.use(
//   cors({
//     credentails: true,
//     origin: "http://localhost:5173",
//   })
// );
const allowedOrigins = ["http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
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
    user.save();
  } catch (er) {
    res.status(422).json(er);
  }
});

app.post("/login", async (req, res) => {
  // req.header['Access-Control-Allow-Credentials'] = tr ue
  const { email, password } = req.body;
  try {
    const userdoc = await User.findOne({ email });
    if (userdoc) {
      // res.json('found')
      const pass = bcrypt.compareSync(password, userdoc.password);

      if (pass) {
        // res.json('nice')
        const token = await jet.sign(
          { email: userdoc.email, id: userdoc._id, name: userdoc.name },
          jetDash,
          {}
        );
        // console.log(token)
        // res.header('Access-Control-Allow-Credentials','tr  ue')
        // res.header('Access-Control-Allow-Origin','*')
        // res.header('Access-Control-Allow-Origin', "*");
        // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        // res.header('Access-Control-Allow-Headers', 'Content-Type');
        return res
          .cookie("token", token, { sameSite: "none", secure: true })
          .json(userdoc); // but this will not save cookie in host 5173 so to do it see in loginpage
        // console.log(userdoc)
      } else {
        res.json("not nice");
      }
    } else {
      res.json("not found");
    }
  } catch (er) {
    return res.status(422).json(er);
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jet.verify(token, jetDash, {}, (er, data) => {
      if (er) throw er;
      res.json(data);
    });
  }
  // res.json({token})
});

app.post("/logout", async (req, res) => {
  return res.cookie("token", "", { sameSite: "none", secure: true }).json(true);
});
// console.log(__dirname)

app.post("/addImage-account", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDown.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photoMiddleWare = multer({ dest: "uploads" });
app.post("/upload", photoMiddleWare.array("photos", 100), (req, res) => {
  const uploadedfiles = [];
  // console.log(req)
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    newpath = path + ".jpg";
    fs.renameSync(path, newpath);
    uploadedfiles.push(newpath.replace("uploads\\", ""));
  }
  // console.log(uploadedfiles)
  res.json(uploadedfiles);
});

app.post("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;

  // console.log(token);
  jet.verify(token, jetDash, {}, async (err, userData) => {
    if (err) {
      // console.log("SDFCVAPSIHASOUBIALSUB");
      throw err;
    }
    
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      images:addedPhotos[0],
      des:description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    })
      .then(() => {
        console.log(addedPhotos)
      })
      .catch((err) => {
        console.log(err);
      });
    
    // placeDoc.save();
    res.json(placeDoc);
  });
});


app.get('/places',async (req,res)=>{
  const {token} = req.cookies;

  jet.verify(token,jetDash,{},async  (err,data)=>{
    const {id} = data;
    res.json( await Place.find({owner:id}))
  })
})

app.get('/places/:id',async (req,res)=>{
  const {id} = req.params;
  res.json(await Place.findById(id))
})

app.put('/places/:id',async(req,res)=>{
  const {id} = req.params;
  const {token} = req.cookies
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  
  jet.verify(token,jetDash,{},async (err,userData)=>{
    if(err) throw err;
    const placeData = await Place.findById(id);
    // console.log(userData.id)
    // console.log(id)
   
    // console.log(placeData.owner)
    if(userData.id == placeData.owner.toString()){
      await placeData.set({
        title,
        address,
        images:addedPhotos,
        des:description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      })
    await placeData.save();
    console.log("updated place")
    res.json('ok')

    }
  })

})

app.listen(6969);
