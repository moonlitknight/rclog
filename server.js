const express = require('express');
const cors = require('cors');
const app = express();
const body_parser = require('body-parser');
const https = require('https');
const fs = require('fs');

const port = 8400;
const path = '/console';

var key = fs.readFileSync(__dirname + '/certs/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt');
var options = {
  key: key,
  cert: cert
};

app.use(body_parser.json());
app.use(cors());

// only route is localhost:4000/console which expects a POSTed json body of cm:log|error, args:[]
app.post(path, (req, res) => {
  res.json({ message: "OK" });     // respond with anything - not used by client
  //console.log(req.body);
  console[req.body.cm](...req.body.args);   // convert body pack to its original console.xx and execute it
});

var server = https.createServer(options, app);
server.listen(port, () => {
  console.log(`Server listening for POSTs to :${port}${path}`);
});





