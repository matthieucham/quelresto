var isString = require('webuiutils/src/sub/StringUtilsMod.js').isString;
var isBlank = require('webuiutils/src/sub/StringUtilsMod.js').isBlank;

/**
 * Indicate if the current route is active or not.
 * Checks if the part <code>XXX</code> within <code>/prefix/XXX/YYY/...</code> or <code>/XXX/YYY/...</code>
 * (<code>currentUrl</code>) matches <code>routeUrl</code>.
 *
 * @param currentUrl {string} Current route url
 * @param routeUrl {string} Current route's name
 * @param params {Object} Dynamic segment parameters
 * @param [strict=false] {boolean} <code>true</code> for strict matches
 * @return {boolean} <code>true</code> if the route is active, <code>false</code> otherwise
 */
var isActiveRoute = function (currentUrl, routeUrl, params, strict) {
    // Abort if any url is missing
    if (!isString(routeUrl) || !isString(currentUrl) || isBlank(routeUrl) || isBlank(routeUrl)) {
        return false;
    }

    // Try to build the current url from the given routeUrl with the params
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            routeUrl = routeUrl.replace(':' + key, params[key]);
        }
    }

    return strict && routeUrl === currentUrl || !strict && currentUrl.indexOf(routeUrl) === 0;
};

/**
 * Applications routes and utils functions.
 * Each route must have the following type :
 * @type {{name: string, url: string, parent: [string]}}
 * - <code>name</code> is an identifier,
 * - <code>url</code> is the displayed URL,
 * - optional <code>parent</code> is the object name (all caps below) that references the route's parent
 */
module.exports = {
    isActiveRoute:          isActiveRoute,
    BASE:                   {
        name: 'sepamail',
        url:  '/'
    },

    MISSIVES: {
        name: 'missives',
        url:  '/missives'
    },
    TOP_FILTERED_MISSIVES: {
        name: 'topFilteredMissives',
        url:  '/missives/filter/:filterLabel/:topFilter'
    },

    CREDITORS: {
        name: 'creditors',
        url:  '/creditors'
    },
    TOP_FILTERED_CREDITORS: {
        name: 'topFilteredCreditors',
        url:  '/creditors/filter/:topFilter'
    },

    CREDITOR_CREATE: {
        name: 'creditorCreate',
        url:  '/creditors/creditor-create'
    },

    CREDITOR_VIEW: {
        name: 'creditorView',
        url:  '/creditors/view/:id'
    },

    USERS: {
        name: 'users',
        url:  '/users'
    },
    TOP_FILTERED_USERS: {
        name: 'topFilteredUsers',
        url:  '/users/filter/:topFilter'
    },

    USER_CREATE: {
        name: 'userCreate',
        url:  '/users/user-create'
    },

    USER_CREATE_WITH_CREDITOR: {
        name: 'userCreateWithCreditor',
        url:  '/users/user-create/:creditorId'
    }
};


