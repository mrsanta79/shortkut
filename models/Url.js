const mongoose = require('mongoose');

const UrlSchema = mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: false,
        default: null
    },
    shortened_url: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Url', UrlSchema);