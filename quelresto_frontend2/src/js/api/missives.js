var api          = require('../api.js'),

    // Set Rest Url
    //missives = api.all('remittances'),

    // API functions
    // =============
    getAllWithPaginate,
    filter       = { query: '' };

getAllWithPaginate = function (page, limit, callback, errorCallback) {
    return api.all('remittances/?page=' + page + '&limit=' + (limit || 10) + filter.query)
        .getAll().errManThen(function (response) {
            response = response();
            EventBus.emit('missivesPageLoaded', {
                loadedRowCount: response.data.items && response.data.items.length || 0,
                totalRowCount:  response.data.totalCount
            }, page === 0);
            callback(response.data);
        }, errorCallback);
};

module.exports = {
    filter:              filter,
    getAllWithPaginate:  getAllWithPaginate
};
