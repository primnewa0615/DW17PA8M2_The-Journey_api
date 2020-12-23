const express = require("express");
var cors = require('cors');
var app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT;

app.use("/imgUpload", express.static('imgUpload'));

app.use(cors());
app.use(bodyParser.json());

const routerv1 = require('./routes/routerv1.js');
app.use('/api/v1', routerv1);




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})