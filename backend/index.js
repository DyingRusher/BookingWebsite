const express = require('express')
const app = express();
const cors = require('cors') // for cammunication between ports

app.use(express.json()) // for parsing json
app.use(cors({
    credentails:true,
    origin:'http://localhost:5173' 
    }
))

app.get('/test',(req,res)=>{
    res.json('done');
});

app.post('/register',(req,res)=>{
    const {name,email,password} = req.body;
    res.json({name,email,password}) //it will giv error
})

app.listen(6969)