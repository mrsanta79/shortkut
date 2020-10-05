const web = require('express').Router();
const path = require('path');

// Import local files
const helpers = require('../helpers/helper');

// Controllers
const UrlController = require('../controllers/UrlController');

// Routes
web.get('/', (req, res) => {
    res.render('index');
});
web.get('/u/:slug', async (req, res) => {
    const { slug } = req.params;

    if(!slug || slug.trim() === '') {
        return res.status(404).render('404');
    }

    const data = await UrlController.getUrl(slug);

    if(!data && data === null) {
        return res.status(404).render('404');
    }

    return res.redirect(data.url);
});

// Export module
module.exports = web;