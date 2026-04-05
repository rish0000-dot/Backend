const express = require("express");
const app = express();
// app.use(cors());    
app.get("/",(req,res)=>{
    res.send("Hello World");
});
app.get("/user",(req,res)=>{
    res.send("Hello User");
});
module.exports = app;
