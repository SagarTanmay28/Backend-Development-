const express = require('express');
const app = express(); // Server Create hogya hai 


app.get('/home',(req,res)=>{
    res.send("Welcome to Home Page")
})

app.get('/about',(req,res)=>{
    res.send("Welcome to About Page")
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})
