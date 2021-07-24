const express = require('express');
const bodyParser = require('body-parser');
const expressRate = require('express-rate-limit');
const xss = require('xss-clean');
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');

const apiLimiter = expressRate({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});
const user = require('./route/user.route');
const db = require('./db.js');
const app = express();
const port = 8000;

app.use(bodyParser.json({limit: '25mb'}));
app.use(bodyParser.urlencoded({limit: '25mb', extended: true}));
app.use(express.json({limit: '10kb'}));//body limit
app.use(xss());
app.use(helmet());
app.use(mongoSanitize());

var corsOptions = {
    origin: ['http://localhost:4200','http://localhost:3000'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,
    methods: "GET, POST"
}

app.use(cors(corsOptions));


app.use('/user', apiLimiter, user.getRouter());


app.get('/cors', (req, res, next) => {
    res.status(200).send({'msg': "CORS enable for get request"});
})

app.post('/cors/add', (req, res, next) => {
    res.status(200).send({'msg': "CORS enable for post request"});
})

app.put('/cors/update', (req, res, next) => {
    res.status(200).send({'msg': "CORS enable for update/put request"});
})

app.delete('/cors/delete', (req, res, next) => {
    res.status(200).send({'msg': "CORS enable for delete request"});
})




app.listen(port, () => {
    console.log(`Node server is running on port ${port}`);
})