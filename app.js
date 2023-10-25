require('dotenv').config({ path: './config.env' });
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const { globalErrorHandler } = require('./controllers/error');
const { connectDB } = require('./db');

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/buyer', buyerRoutes);
app.use('/api/v1/seller', sellerRoutes);
app.use(globalErrorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
