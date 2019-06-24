const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send(`This app runs on port: ${PORT}`));
app.listen(PORT, console.log(`This app runs on port: ${PORT}`));