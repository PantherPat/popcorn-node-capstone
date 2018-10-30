const {PORT, DB_URL, TEST_DB_URL, YT_key, CLIENT_ORIGIN} = require('./config');
const express = require('express');
const cors = require('cors');
const app = express();

var corsOptions = {
  origin: 'https://popcorn-capstone.herokuapp.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
require('./passport');
mongoose.Promise = global.Promise;

const videoRouter = require('./routers/videoRouter');
const auth = require('./routers/auth');
const userRouter = require('./routers/userRouter');

app.use(express.json());
app.use(morgan('common'));
app.use('/videos', videoRouter);
app.use('/auth', auth);
app.use('/user', passport.authenticate('jwt', {session: false}), userRouter);

let server;

function runServer(databaseUrl, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, {useNewUrlParser: true}, err => {
        if (err) {
            return reject(`Something went wrong -- MongoError: ${err.errmsg}`);
        }
        server = app.listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve();
        }).on('error', (err) => {
            mongoose.disconnect();
            reject(`Whoops! there was an error: ${err}.`);
        });
    }).catch(err => {
        console.log(`Whoops! there was an error: ${err.name}: ${err.errmsg}.`);
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
    runServer(DB_URL, PORT).catch(err => console.error(err));
}

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;
