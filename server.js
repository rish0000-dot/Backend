const http = require("http");


const server = http.createServer((req , res) => {
  if(req.method=="POST" && res.url=="/task"){
    let body = "";
    req.on("data", (chunk) =>
    body +=chunk
)};
req.on("end", ()=> {
    const newTask = JSON.parse(body);
    const filepath = path.join(__dirname , "task.json"); 
    fs.readFile(filepath , "utf8", (err, data)=> {
      const task = data ? JSON.parse(body)  : [];
      newTask.id = task.length+1;
      task.push(newTask);
      fs.writeFile
    })
})
})