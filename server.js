const passport = require('passport');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3055;
const productRoutes = require('./api/routes/productRoutes');
const productModel = require('./api/models/productModel');
//const userRoutes = require('./api/routes/UserRoutes');
//const userModel = require('./api/models/UserModel');
//const transactionRoutes = require('./api/routes/transactionRoutes');
//const transactionModel = require('./api/models/transactionModel');
const config = require('./config/database');
const path = require('path');

// Connect to db
//mongoose.Promise = global.Promise;
mongoose.connect(config.database);

// On error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// BodyParser Middleware
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//transactionRoutes(app);
//userRoutes(app);
productRoutes(app);

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});