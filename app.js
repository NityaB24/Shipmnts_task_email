const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();
const app = express();

connectDB();

app.use(bodyParser.json());

app.use('/api/emails', require('./routes/email.routes'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
