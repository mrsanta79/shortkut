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
    },
    validateUrl: (url) => {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(url);
    }
}