const api = require('express').Router();

// Import local files
const helpers = require('../helpers/helper');

// Controllers
const UrlController = require('../controllers/UrlController');

// Routes
api.post('/new', async (req, res) => {
    try {
        const data = await UrlController.createShortenedUrl(req.body);

        return res.status(200).json({
            success: true,
            data,
            message: 'New shortened url created'
        });
    } catch(err) {
        return res.status(400).json({
            success: false,
            data: null,
            message: err.message
        });
    }
})

// Export module
module.exports = api;