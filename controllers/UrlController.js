const uniqid = require('uniqid');
const mongoose = require('mongoose');

// Import local files
const UrlModel = require('../models/Url');
const helpers = require("../helpers/helper");


module.exports = {
    createShortenedUrl: async (data) => {
        // Validate URL data
        if(!data.url || data.url.trim() === '') {
            throw new Error('URL is required');
        }

        // Validate URL
        if(!helpers.validateUrl(data.url)) {
            throw new Error('Invalid URL');
        }

        // Check slug
        if(data.slug && data.url.trim() !== '') {
            const checkSlug = await UrlModel.find({ slug: data.slug.trim() });
            if(checkSlug !== null && checkSlug.length) {
                throw new Error('This slug is already present');
            }
        }

        // Create slug
        const slug = (data.slug && data.slug.trim()) || uniqid.process();
        const url = (data.url.trim().includes('http://') || data.url.trim().includes('https://')) ? data.url.trim() : 'http://' + data.url.trim();

        // Create request object
        const request = {
            url: url,
            slug: slug,
            shortened_url: helpers.url(`/u/${slug}`),
        }

        return await UrlModel.create(request);
    },

    getUrl: async (slug) => {
        const data = await UrlModel.findOne({ slug });

        return data;
    }
}