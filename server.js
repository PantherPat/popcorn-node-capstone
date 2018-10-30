const {PORT, DB_URL, TEST_DB_URL, YT_key, CLIENT_ORIGIN} = require('./config');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.options('*', cors());

const videoRouter = require('./routers/videoRouter');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.use(express.json());
app.use(morgan('common'));
app.use('/videos', videoRouter);


app.listen(port=PORT, () => {
    console.log(`Listening on port: ${port}!`);
});

exports.app = app;
