const express = require('express');
const bodyParser = require('body-parser');
const PORT = 5000
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/serve",express.static(__dirname + '/uploads'))
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

require("./routes/auth")(app)
require("./routes/routing")(app)
app.get('/', (req, res) => {
    res.json({ "message": "Welcome" });
});
app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
});