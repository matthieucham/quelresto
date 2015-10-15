var api     = require('../api.js'),
    offers  = api.all('offers'),

    filter = { query: '' };

module.exports = {
    filter: filter,
    getAll: offers.getAll
};
