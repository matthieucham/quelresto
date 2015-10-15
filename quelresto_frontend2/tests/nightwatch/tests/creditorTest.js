var Nightwatch       = require('sepamail-common/tests/nightwatch'),
    NightwatchFilter = Nightwatch.Filter,
    NightwatchView   = Nightwatch.View,
    NightwatchAcl    = Nightwatch.Acl,
    uuid;

module.exports = {
    '@disabled': false,

    'Create creditors for permissions': function(client) {
        var creditorList = client.page.creditorList(),
            creditorForm = client.page.creditorForm(),
            login = 'sepamail';

        client.perform(function(c, done) {
                for (var i = 0; i < NightwatchAcl.creditors.length; i++) {
                    creditorList.navigate();
                    NightwatchFilter(client)
                        .selectFilter('#filterName', NightwatchAcl.creditors[i].name)
                        .checkLineAndPerform(NightwatchAcl.creditors[i].name, function(creditor) {
                            var permissionIds = typeof creditor.acls === 'number' ? [creditor.acls] : creditor.acls;

                            NightwatchView(client).selectFirst();
                            creditorForm.checkUser(login, function() {
                                creditorForm.associateUser(login, permissionIds);
                            });
                        }.bind(null, NightwatchAcl.creditors[i]), function(creditor) {
                            creditorForm.createWithPermission(creditor);
                        }.bind(null, NightwatchAcl.creditors[i]));
                }

                done();
            });
    },

    'Create creditor': function(client) {
        var creditorForm = client.page.creditorForm();
            uuid = client.globals.getUUID();

        creditorForm.navigate()
            .waitForElementVisible('body', 1000)
            .setCreditor(uuid)
            .setAccount()
            .submit(function() {
                NightwatchFilter(client)
                    .selectFilter('#filterName', uuid)
                    .checkLineText(uuid)
            });
    },

    'Tests filter': function(client) {
        var creditorList = client.page.creditorList();

        creditorList.navigate();
        NightwatchFilter(client)
            .selectFilter('#filterSiret', '43407571900048')
            .checkLineText('43407571900048')
            .selectFilter('#filterName', uuid)
            .checkLineText(uuid);

        client.end();
    }
};
