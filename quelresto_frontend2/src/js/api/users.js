var api    = require('../api.js'),
    notify = require('sepamail-common').notify,
    users  = api.all('users'),
    create,
    updateUser,
    getAllWithPaginate,

    filter = { query: '' };

create = function (user) {
    var newUser = $.extend(true, {}, user);

    typeof newUser.selectedCreditor !== 'undefined' && delete newUser.selectedCreditor;
    typeof newUser.associatedCreditor !== 'undefined' && delete newUser.associatedCreditor;
    typeof newUser.userExists !== 'undefined' && delete newUser.userExists;
    typeof newUser.profileList !== 'undefined' && delete newUser.profileList;

    return users.post(newUser)
        .errManThen(function () {
            notify.success(user.userExists ? 'userCreate.notifyAssociated' : 'userCreate.notifyCreated');
        });
};

updateUser = function (userId, modif) {
    return api.one('users', userId).put(modif);
};

getAllWithPaginate = function (page, limit, callback, errorCallback, creditorUuid) {
    var url = 'users';
    creditorUuid && (url += '/excludebinded/' + creditorUuid);
    return api.all(url + '?page=' + page + '&limit=' + (limit || 10) + filter.query)
        .getAll().errManThen(function (response) {
            response = response();
            EventBus.emit('usersPageLoaded', {
                loadedRowCount: response.data.items && response.data.items.length || 0,
                totalRowCount:  response.data.totalCount
            }, page === 0);
            callback(response.data);
        }, errorCallback);
};

module.exports = {
    filter:             filter,
    create:             create,
    get:                users.get,
    update:             updateUser,
    getAllWithPaginate: getAllWithPaginate
};
