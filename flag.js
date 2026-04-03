const fs = require("fs");

fs.writeFile("logs.txt", "hello Rishabh\n", { flag: "a" }, (err) => {
  if (err) {
    console.error("Error writing to file:", err);
  } else {
    console.log("Log written successfully.");
  }
});

