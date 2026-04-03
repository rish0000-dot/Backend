const express = require("express");
const app = express();
app.get("/sub", (req , res)=> {
    console.log(req.query);
    const a = parseInt(req.query.a) + parseInt(req.query.b);
    res.send(a.toString());
})
app.get("/mul", (req , res)=> {
    console.log(req.query);
    const a = parseInt(req.query.a) * parseInt(req.query.b);
    res.send(a.toString());
})
app.get("/div", (req , res)=> {
    console.log(req.query);
    const a = parseInt(req.query.a) / parseInt(req.query.b);
    res.send(a.toString());
})
app.get("/sub", (req , res)=> {
    console.log(req.query);
    const a = parseInt(req.query.a) - parseInt(req.query.b);
    res.send(a.toString());
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})