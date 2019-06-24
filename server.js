const express = require('express');
const connectDB = require('./config/db');

const app = express();
// Connect DB
connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send(`This app runs on port: ${PORT}`));
// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.listen(PORT, console.log(`This app runs on port: ${PORT}`));