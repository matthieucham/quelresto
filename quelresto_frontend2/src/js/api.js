window.$ = require('jquery');
require('jquery.cookie');

var restful = require('restful.js'),
    notify  = require('sepamail-common').notify,
    URL     = require('url-parse'),
    url     = new URL(window && window.restUri ? window.restUri : ''),
    api     = restful(url.hostname + url.pathname).protocol(url.protocol.replace(':', '') || 'http');

url.port && (api = api.port(url.port));

Promise.prototype.errManThen = function (successCallback, errorObj) {
    var notificationManagement = function (status, errorMessage) {
        if (status === 401) {
            notify.error(Messages.getMsg('notify.unauthorized'));
        }
        else if (status === 403) {
            notify.error(Messages.getMsg('notify.forbidden'));
        }
        else {
            notify.error(errorMessage || Messages.getMsg('notify.error'));
        }
    };

    return this.then(successCallback, function (response) {
        if (typeof response === 'undefined') {
            return;
        }

        var status = response.status,
            error;

        if (status === 1223) {
            // IE 9 fix : 204 is handled as a 1223 status
            // ------------------------------------------
            typeof successCallback === 'function' && successCallback(function () {
                return response;
            });
            return;
        }

        error = ['function', 'string'].indexOf(typeof errorObj) !== -1 && errorObj ||
            response.data && response.data.msg ||
            errorObj && typeof errorObj[status] !== 'undefined' && errorObj[status];

        if (typeof error === 'function') {
            error() && notificationManagement(status, response.data && response.data.msg);
        }
        else {
            notificationManagement(status, error);
        }

        return Promise.reject();
    });
};

Promise.prototype.complete = function (callback) {
    return this.then(callback, callback);
};

api.getAuthorizationToken = function () {
    // stub auth token: FIXME: remove when auth is ON in the app
    var authToken;
    try {
        authToken = $.cookie('authToken');
    }
    catch (e) {
        authToken = '';
    }

    if (authToken) {
        return authToken;
    }

    return api.all('auth-token/FIXME').getAll().then(function (resp) {
        authToken = resp.body().data().authToken;
        $.cookie('authToken', authToken, { expires: 30, path: '/' });
        return authToken;
    });
};

api.initAuth = function () {
    var authToken = api.getAuthorizationToken();
    if (authToken instanceof Promise) {
        authToken.then(api.addAuthorizationHeader);
    }
    else {
        api.addAuthorizationHeader(authToken);
    }
};

api.addAuthorizationHeader = function (authToken) {
    api.header('Authorization', 'Bearer ' + authToken);
};

api.globalExceptionHandler = function (data) {
    // to edit the headers, just edit the headers object
    if (data.type === 'ERROR') {
        notify.error(data.msg);
    }
    // You always must return the data object
    return data;
};

module.exports = api;
