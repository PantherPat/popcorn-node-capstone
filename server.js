const {YT_key, CLIENT_ORIGIN} = require('./config');
const videoRouter = require('./routers/videoRouter');
const express = require('express');
const cors = require('cors');
const request = require('request');
const morgan = require('morgan');

const app = express();

const port = process.env.PORT || 3000;

const {User} = require("./models/users");

app.use('/videos', videoRouter);
app.use(express.json());
app.use(morgan('common'));

app.use(cors({
    origin: CLIENT_ORIGIN
}));

app.listen(port, () => {
    console.log(`Listening on port: ${port}!`);
});

exports.app = app;
