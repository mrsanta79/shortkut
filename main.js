const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const https = require('https');
const redirectSSL = require('redirect-ssl');

// Import local files
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const helpers = require('./helpers/helper');

// Initialize app
const app = express();

// App config
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mongoose connection
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(helpers.env('DB_URL'), mongooseOptions);

// Set assets directory
app.use('/assets', express.static(path.join(__dirname, './assets/')));

// Autoload functions to views
app.locals.helpers = helpers;

// Set render engine
app.engine('ejs', ejs.renderFile);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes
app.use(webRoutes);
app.use('/api/v1/', apiRoutes);

// Error Routes
app.use(function(req, res) {
	res.status(404).render('404');
});

// Listen to app port
app.listen(helpers.env('APP_PORT') || 8080);

// Activate SSL if found on production
if(process.env.APP_ENV === 'production') {
    https.createServer(app).listen(process.env.APP_PORT_SECURED || 8080);
}