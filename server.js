const http = require("http");
const port = 8081;
const path = require("path");
const fs = require("fs/promises");
const fsx = require("fs");

const filePath = path.join(__dirname + "/data.json");
const data = JSON.parse(fsx.readFileSync(filePath, "utf-8"));

http.createServer((req, res) => {
    try {
      res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.writeHead(200, {"Content-type":"text/html"})
    const formData = [];
    req.on("data", (formDataPieces) => {
      formData.push(formDataPieces);
    });
    req.on("end", () => {
      console.log(Buffer.concat(formData).toString());
    
      let formdata = Buffer.concat(formData).toString();

      let getData = async() => {
        console.log(formdata);
        let presentData = await fs.writeFile("./data.txt", formData);
        await fs.appendFile("./data.txt", formData);
      }
getData();
    })
      res.end(JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  }).listen(port, () => {
    console.log(`Listening to port ${port} `);
    console.log(filePath);
  });