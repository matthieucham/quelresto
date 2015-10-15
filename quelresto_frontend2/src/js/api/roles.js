var api     = require('../api.js'),
    roles  = api.all('roles'),

    filter = { query: '' };

module.exports = {
    filter: filter,
    getAll: roles.getAll
};
