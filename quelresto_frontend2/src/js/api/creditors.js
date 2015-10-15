var api         = require('../api.js'),
    notify      = require('sepamail-common').notify,
    creditors   = api.all('creditors'),

    create,
    getRequest,
    getAllWithPaginate,

    filter = { query: '' };

create = function (creditor) {
    return creditor.uuid
        ?
        creditors.put(creditor.uuid, creditor).errManThen(function() {
            notify.success('creditorCreate.notifyUpdated');
        })
        :
        creditors.post(creditor).errManThen(function() {
            notify.success('creditorCreate.notifyCreated');
        });
};

getRequest = function (uuid) {
    return creditors.get(uuid);
};

getAllWithPaginate = function (page, limit, callback, errorCallback) {
    return api.all('creditors/?page=' + page + '&limit=' + (limit || 10) + filter.query)
        .getAll().errManThen(function (response) {
            response = response();
            EventBus.emit('creditorsPageLoaded', {
                loadedRowCount: response.data.items && response.data.items.length || 0,
                totalRowCount:  response.data.totalCount
            }, page === 0);
            callback(response.data);
        }, errorCallback);
};

module.exports = {
    filter:             filter,
    create:             create,
    get:                getRequest,
    getAllWithPaginate: getAllWithPaginate
};
