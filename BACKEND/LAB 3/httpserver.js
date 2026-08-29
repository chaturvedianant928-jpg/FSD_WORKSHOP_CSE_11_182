import http from 'http';

const userdata = [{ id: 1, name: "Anant", age: 19 },{ id: 2, name: "Aditya", age: 19 }];

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/user" && method === "POST") {
    let body = "";
    
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const newUser = JSON.parse(body);
      userdata.push(newUser);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User added", userdata }));
    });
  } else if (url === "/user" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(userdata));
  } 
  else {
    res.end("Hello World");
  }
});
server.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});