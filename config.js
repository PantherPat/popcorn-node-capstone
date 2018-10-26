require('dotenv').config();
exports.DB_URL = process.env.DB_URL;
exports.YT_key = process.env.YT_key;
exports.PORT = process.env.PORT || 8080;
exports.CLIENT_ORIGIN = 'https://popcorn-capstone.herokuapp.com';
