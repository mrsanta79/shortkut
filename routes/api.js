const api = require('express').Router();

// Import local files
const helpers = require('../helpers/helper');

// Controllers


// Routes
api.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Wow! It works!'
    })
})

// Export module
module.exports = api;