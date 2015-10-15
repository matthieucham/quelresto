var Nightwatch       = require('sepamail-common/tests/nightwatch'),
    NightwatchFilter = Nightwatch.Filter,
    NightwatchView   = Nightwatch.View;

module.exports = {
    url: function() {
        return this.api.launchUrl + 'creditors/creditor-create';
    },
    elements: {
        reference:        { selector: 'input[name=name]' },
        siret:            { selector: 'input[name=siret]' },
        address:          { selector: 'textarea[name=address]' },
        icqx:             { selector: 'input[name=icqx]' },
        email:            { selector: 'input[name=email]' },
        btnAddUser:       { selector: '#add_user' },
        userList:         { selector: '#userList' },
        btnAddContract:   { selector: '#add_account' },
        accounts:         { selector: '.account' },
        accountsContract: { selector: '.account .account-reference' },
        accountsQxban:    { selector: '.account .account-qxban' },
        submit:           { selector: '#btn-submit' }
    },
    commands: [
        {
            setCreditor: function(uuid) {
                return this
                    .setValue('@reference', uuid)
                    .setValue('@siret', '43407571900048')
                    .setValue('@address', 'Lyra Network Labège')
                    .setValue('@icqx', 'FR35434075719')
                    .setValue('@email', 'mail@lyra-network.com');
            },

            setAccount: function() {
                var uuid = this.api.globals.getUUID();

                return this
                    .clearValue('@accountsContract')
                    .setValue('@accountsContract', 'CONTRACT-' + uuid)
                    .setValue('@accountsQxban', 'QX58CCBPFRPPTLSJK4WFMEY1NX4YMZXDVH');
            },

            addUser: function(cb) {
                this
                    .waitForElementVisible('@btnAddUser', 2000)
                    .click('@btnAddUser')
                    .verify.urlContains(this.api.launchUrl + 'users/user-create');
                this.api.pause(1000);

                if (typeof cb === 'function') {
                    cb();
                }

                return this;
            },

            checkUser: function(login, errorCallback) {
                var emptyList = true;

                this
                    .waitForElementVisible('@userList', 1000)
                    .api.elements('css selector', '#userList .user', function(result) {
                        var created = false;

                        result.value.map(function(v, k) {
                            emptyList = false;
                            this.elementIdText(v.ELEMENT, function(res) {
                                if (res.value.indexOf(login) !== -1) {
                                    created = true;
                                }

                                if (result.value.length - 1 === k) {
                                    if (typeof errorCallback === 'function' && !created) {
                                        errorCallback();
                                    }
                                    else {
                                        this.assert.ok(created, 'User '+ login +' checked !');
                                    }
                                }
                            });
                        }.bind(this));
                    }).perform(function(c, done) {
                        if (emptyList) {
                            if (typeof errorCallback === 'function') {
                                errorCallback();
                            }
                            else {
                                this.assert.ok(false, 'User '+ login +' checked !');
                            }
                        }
                        done();
                    }.bind(this));

                return this;
            },

            associateUser: function(login, permissionIds) {
                var userForm = this.api.page.userForm();

                return this.addUser(function() {
                    userForm
                        .loadUser(login)
                        .selectPermission(permissionIds)
                        .submit(function() {
                            this.api.pause(1500);
                            this.waitForElementVisible('@userList', 1000);
                        }.bind(this));
                }.bind(this));
            },

            createWithPermission: function(creditor) {
                var uuid     = creditor.name,
                    userForm = this.api.page.userForm()
                    permissionIds = typeof creditor.acls === 'number' ? [creditor.acls] : creditor.acls;

                return this.navigate()
                    .waitForElementVisible('@reference', 3000)
                    .setCreditor(uuid)
                    .setAccount()
                    .submit(function() {
                        NightwatchFilter(this.api)
                            .selectFilter('#filterName', uuid)
                            .checkLineText(uuid);

                        NightwatchView(this.api)
                            .selectFirst();

                        this.associateUser('sepamail', permissionIds);
                    }.bind(this));
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
