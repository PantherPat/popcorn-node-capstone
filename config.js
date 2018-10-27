require('dotenv').config();
exports.DB_URL = process.env.DB_URL;
exports.YT_key = process.env.YT_key;
exports.PORT = process.env.PORT || 8080;
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
// 'https://popcorn-capstone.herokuapp.com';
