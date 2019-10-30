const express = require('express');
const cors = require('cors');
const app = express();
const body_parser = require('body-parser');

const port = 8400;
const path = '/console';

app.use(body_parser.json());
app.use(cors());

// only route is localhost:4000/console which expects a POSTed json body of cm:log|error, args:[]
app.post(path, (req, res) => {
   res.json({ message: "OK" });     // respond with anything - not used by client
    //console.log(req.body);
    console[req.body.cm](...req.body.args);   // convert body pack to its original console.xx and execute it
});

app.listen(port, () => {
    console.log(`Server listening for POSTs to :${port}${path}`);
});





