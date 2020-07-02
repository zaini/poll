const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connecting to MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB db connection established");
});

// Initialising routes
const pollRouter = require('./routes/polls');
app.use('/polls', pollRouter);

// After API this is the middleware that is run to output errors
app.use((err, req, res, next) => {
    res.status(422).send({error: err.message});
});

app.use(express.static(path.join(__dirname, '../poll/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../poll/build/index.html'))
})

// Listening for requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});