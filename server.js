const {YT_key, CLIENT_ORIGIN} = require('./config');
const videoRouter = require('./routers/videoRouter');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
const morgan = require('morgan');

const port = process.env.PORT || 3000;

const {User} = require("./models/users");

app.use('/videos', videoRouter);
app.use(express.json());
app.use(morgan('common'));


app.listen(port, () => {
    console.log(`Listening on port: ${port}!`);
});

exports.app = app;
