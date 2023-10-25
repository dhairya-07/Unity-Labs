const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/Unity-Labs';

exports.connectDB = function () {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log('DATABASE CONNECTED');
    })
    .catch((err) => {
      console.log(err);
    });
};
