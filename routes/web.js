const web = require('express').Router();
const path = require('path');

// Import local files
const helpers = require('../helpers/helper');

// Controllers
const WebController = require('../controllers/WebController');

// Routes
web.get('/', (req, res) => {
    res.render('index');
});

// Export module
module.exports = web;