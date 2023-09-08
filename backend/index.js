const express = require('express')
const app = express();

app.get('/test',(req,res)=>{
    res.json('done');
});

app.listen(6969)