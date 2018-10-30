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

let server;

function runServer(databaseUrl, port = PORT) {
    console.log(port);
    return new Promise((resolve, reject) => {
        mongoose
            .connect(
                databaseUrl, {
                    useNewUrlParser: true
                },
                err => {
                    if (err) {
                        return reject("Something went wrong");
                    }
                    server = app
                        .listen(port, () => {
                            console.log(`Your app is listening on port ${port}!`);
                            resolve();
                        })
                        .on("error", err => {
                            mongoose.disconnect();
                            reject("Unable to connect to port. Disconnecting Mongoose.");
                        });
                }
            )
            .catch(err => {
                console.log("Unable to connect to Mongoose.");
            });
    });
}

function closeServer() {}

if (require.main === module) {
    console.log(DB_URL, PORT);
    runServer(DB_URL, PORT).catch(err => {
        console.log(`In ${require.main.filename}`);
        console.error(err);
    });
}

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;