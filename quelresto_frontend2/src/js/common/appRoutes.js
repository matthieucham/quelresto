var AppUrls = require('./appUrls'),

    defaultHandler  = require('@blank.jsx'),
    notFoundHandler = require('@notfound.jsx'),
    baseHandler     = require('@app.jsx'),

    missives = require('@Missives.jsx'),

    users      = require('@Users.jsx'),
    userCreate = require('@UserCreate.jsx'),

    creditors      = require('@Creditors.jsx'),
    creditorCreate = require('@CreditorCreate.jsx'),
    creditorView   = require('@CreditorView.jsx');

/**
 * Constants mapping URL names to page components (handlers)
 */
module.exports = {
    DEFAULT : {
        handler : defaultHandler
    },
    NOTFOUND : {
        handler : notFoundHandler
    },
    BASE : {
        name : AppUrls.BASE.name,
        url : AppUrls.BASE.url,
        handler : baseHandler
    },
    ROUTES : {
        MISSIVES:        {
            name:    AppUrls.MISSIVES.name,
            url:     AppUrls.MISSIVES.url,
            handler: missives
        },
        TOP_FILTERED_MISSIVES:        {
            name:    AppUrls.TOP_FILTERED_MISSIVES.name,
            url:     AppUrls.TOP_FILTERED_MISSIVES.url,
            handler: missives
        },

        CREDITORS:        {
            name:    AppUrls.CREDITORS.name,
            url:     AppUrls.CREDITORS.url,
            handler: creditors
        },
        TOP_FILTERED_CREDITORS:        {
            name:    AppUrls.TOP_FILTERED_CREDITORS.name,
            url:     AppUrls.TOP_FILTERED_CREDITORS.url,
            handler: creditors
        },

        CREDITOR_CREATE:        {
            name:    AppUrls.CREDITOR_CREATE.name,
            url:     AppUrls.CREDITOR_CREATE.url,
            handler: creditorCreate
        },

        CREDITOR_VIEW:        {
            name:    AppUrls.CREDITOR_VIEW.name,
            url:     AppUrls.CREDITOR_VIEW.url,
            handler: creditorView
        },

        USERS:        {
            name:    AppUrls.USERS.name,
            url:     AppUrls.USERS.url,
            handler: users
        },
        TOP_FILTERED_USERS:        {
            name:    AppUrls.TOP_FILTERED_USERS.name,
            url:     AppUrls.TOP_FILTERED_USERS.url,
            handler: users
        },

        USER_CREATE:        {
            name:    AppUrls.USER_CREATE.name,
            url:     AppUrls.USER_CREATE.url,
            handler: userCreate
        },

        USER_CREATE_WITH_CREDITOR:        {
            name:    AppUrls.USER_CREATE_WITH_CREDITOR.name,
            url:     AppUrls.USER_CREATE_WITH_CREDITOR.url,
            handler: userCreate
        }
    }
};
