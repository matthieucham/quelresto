var NightwatchFilter = require('sepamail-common/tests/nightwatch').Filter;

module.exports = {
    '@disabled': true,

    'Tests filter': function(client) {
        var missiveList = client.page.missiveList();

        missiveList.navigate();
        NightwatchFilter(client)
            // .selectFilter('#filterReference', 'FACTE14242RK172')
            // .checkLineText('FACTE14242RK172')
            // .selectFilter('#filterName', 'GADBILF')
            // .checkLineText('GADBILF')
            .selectFilter('#filterType', 'RUBIS_PAYMENT_GROUPED_REQUEST')
            .customCommand(function() {
                missiveList.checkLineType('RUBIS_PAYMENT_GROUPED_REQUEST')
            })
            .selectFilter('#filterType', 'DIAMOND_VERIFICATION_REQUEST')
            .customCommand(function() {
                missiveList.checkLineType('DIAMOND_VERIFICATION_REQUEST')
            })
            .selectFilter('#filterState', 'PENDING')
            .customCommand(function() {
                missiveList.checkLineState('PENDING')
            });

        client.end();
    }
};
