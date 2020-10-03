require('dotenv').config();

module.exports = {
    env: (key = '') => {
        if(!key && key === '') throw new Error('Env key is required');

        return process.env[key];
    },
    url: (url = '') => {
        // Check if URL starts with '/'
        if(url.startsWith('/')) url = url.replace('/', '');

        return module.exports.env('APP_URL') + ':' + module.exports.env('APP_PORT') + '/' + url;
    },
    api: (url = '') => {
        // Check if URL starts with '/'
        if(url.startsWith('/')) url = url.replace('/', '');

        return module.exports.url('/api/' + url);
    }
}