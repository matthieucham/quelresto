var Nightwatch       = require('sepamail-common/tests/nightwatch'),
    NightwatchFilter = Nightwatch.Filter,
    NightwatchView   = Nightwatch.View;

module.exports = {

    url: function() {
        return this.api.launchUrl + 'users/user-create';
    },

    elements: {
        lastName:      { selector: 'input[name=lastName]' },
        firstName:     { selector: 'input[name=firstName]' },
        login:         { selector: 'input[name=login]' },
        email:         { selector: 'input[name=email]' },
        creditorList:  { selector: '#creditorList' },
        btnSearchUser: { selector: '#btn-search-user' },
        submit:        { selector: '#btn-submit' }
    },

    commands: [
        {
            setUser: function(uuid) {
                uuid = 'USR-' + uuid;

                return this
                    .setValue('@lastName', 'Jeanne')
                    .setValue('@firstName', 'ROCHEFORT')
                    .setValue('@login', uuid)
                    .setValue('@email', 'jrochefort@lyra-network.com');
            },

            loadUser: function(login, cb) {
                return this.click('@btnSearchUser', function() {
                    NightwatchFilter(this.api)
                        .selectFilter('#filterLogin', login)
                        .checkLineText(login);
                        
                    NightwatchView(this.api)
                            .selectFirst();

                    if (typeof cb === 'function') {
                        cb();
                    }
                }.bind(this));
            },

            selectPermission: function(permissionIds) {
                this.waitForElementVisible('@creditorList', 2000)
                    .waitForElementVisible('#creditorList .creditor-0', 2000)
                    .click('#creditorList .creditor-0 .panel-heading a')
                    .api.pause(800)
                    .elements('css selector', '#creditorList .creditor-0 .switch-rights .bootstrap-switch-handle-off', function(result) {
                        result.value.map(function(v, k) {
                            if (permissionIds.indexOf(k) !== -1) {
                                this.elementIdClick(v.ELEMENT);
                                this.pause(500);
                            }
                        }.bind(this));
                    });

                return this;
            },

            submit: function(cb) {
                return this.click('@submit', function() {
                    if (typeof cb === 'function') {
                        cb();
                    }
                }.bind(this));
            }
        }
    ]
};
