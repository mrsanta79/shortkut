const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
require('dotenv').config();

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
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ type: 'application/*+json' }));

// Routes
app.use(webRoutes);
app.use('/api/v1/', apiRoutes);

// Set assets directory
app.use('/assets', express.static(path.join(__dirname, './assets/')));

// Autoload functions to views
app.locals.helpers = helpers;

// Set render engine
app.engine('ejs', ejs.renderFile);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Error Routes
app.use(function(req, res, next) {
	res.status(404).render('404');
});

// Listen to app port
app.listen(helpers.env('APP_PORT') || 8080);