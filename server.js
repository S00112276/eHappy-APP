const passport = require('passport');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//routes
const productRoutes = require('./api/routes/productRoutes');
const userRoutes = require('./api/routes/UserRoutes');
const transactionRoutes = require('./api/routes/transactionRoutes');

//models
const productModel = require('./api/models/productModel');
const userModel = require('./api/models/UserModel');
const transactionModel = require('./api/models/transactionModel');

//database
const config = require('./config/database');

const path = require('path');
const app = express();

//set port on 3055
const port = process.env.PORT || 3055;
// Connect to db
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
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

transactionRoutes(app);
//userRoutes(app);
productRoutes(app);

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});