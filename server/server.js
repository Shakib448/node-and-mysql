const express = require("express");
const app = express();
const expressip = require("express-ip");
const PORT = process.env.PORT || 80;
const ngrok = require("ngrok");

// http://localhost:4040/inspect/http

(async function () {
  await ngrok.connect();
})();

app.use(expressip().getIpInfoMiddleware);

app.set("PORT", PORT);

app.get("/", function (req, res) {
  const ipInfo = req.ipInfo;
  const message = `Hey, you are browsing from ${ipInfo.city}, ${ipInfo.country} and your IP ${ipInfo.ip}`;
  res.send(message);
});

app.listen(app.get("PORT"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("PORT") +
      "; press Ctrl-C to terminate."
  );
});
// const http = require("http");
// const ngrok = require("ngrok");

// const port = 80;
// const server = http.createServer((req, res) => {
//   res.end("Hello, World!");
// });

// server.listen(port, (err) => {
//   if (err) return console.log(`Something bad happened: ${err}`);
//   console.log(`Node.js server listening on ${port}`);

//   ngrok.connect(port, function (err, url) {
//     console.log(`Node.js local server is publicly-accessible at ${url}`);
//   });
// });
